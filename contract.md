// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingRewards is Ownable, ReentrancyGuard {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;
    uint256 public timeUnit;
    uint256 public rewardRatioNumerator;
    uint256 public rewardRatioDenominator;
    uint256 public feePercent = 2; // 2% fee

    struct Staker {
        uint256 amountStaked;
        uint256 lastClaimedTime;
        uint256 rewardDebt;
    }

    mapping(address => Staker) public stakers;

    event Staked(address indexed user, uint256 amount, uint256 fee);
    event Unstaked(address indexed user, uint256 amount, uint256 fee);
    event RewardClaimed(address indexed user, uint256 reward, uint256 fee);
    event RewardTokenDeposited(address indexed owner, uint256 amount);
    event RewardTokenWithdrawn(address indexed owner, uint256 amount);
    event RewardRatioUpdated(uint256 numerator, uint256 denominator);
    event FeePercentUpdated(uint256 newFeePercent);

    constructor(
        address _stakingToken,
        address _rewardToken,
        uint256 _timeUnit,
        uint256 _rewardRatioNumerator,
        uint256 _rewardRatioDenominator
    ) Ownable(msg.sender) {
        require(_stakingToken != address(0), "Staking token zero address");
        require(_rewardToken != address(0), "Reward token zero address");
        require(_timeUnit > 0, "Time unit must > 0");
        require(_rewardRatioDenominator > 0, "Denominator must > 0");

        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        timeUnit = _timeUnit;
        rewardRatioNumerator = _rewardRatioNumerator;
        rewardRatioDenominator = _rewardRatioDenominator;
    }

    function setRewardRatio(uint256 _numerator, uint256 _denominator) external onlyOwner {
        require(_denominator > 0, "Denominator must > 0");
        rewardRatioNumerator = _numerator;
        rewardRatioDenominator = _denominator;
        emit RewardRatioUpdated(_numerator, _denominator);
    }

    function setFeePercent(uint256 _feePercent) external onlyOwner {
        require(_feePercent <= 100, "Fee cannot exceed 100%");
        feePercent = _feePercent;
        emit FeePercentUpdated(_feePercent);
    }

    function depositRewardTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must > 0");
        require(rewardToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit RewardTokenDeposited(msg.sender, amount);
    }

    function withdrawRewardTokens(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must > 0");
        require(rewardToken.transfer(msg.sender, amount), "Transfer failed");
        emit RewardTokenWithdrawn(msg.sender, amount);
    }

    function getStakedAmount(address user) external view returns (uint256) {
        return stakers[user].amountStaked;
    }

    function getClaimableReward(address user) public view returns (uint256) {
        Staker memory staker = stakers[user];
        if (staker.amountStaked == 0 || staker.lastClaimedTime == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - staker.lastClaimedTime;
        return (staker.amountStaked * rewardRatioNumerator * timeElapsed) / 
               (rewardRatioDenominator * timeUnit);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must > 0");

        Staker storage staker = stakers[msg.sender];
        
        if (staker.amountStaked > 0) {
            _claimReward(msg.sender);
        }

        uint256 feeAmount = (amount * feePercent) / 100;
        uint256 stakeAmount = amount - feeAmount;

        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        if (feeAmount > 0) {
            require(stakingToken.transfer(owner(), feeAmount), "Fee transfer failed");
        }

        staker.amountStaked += stakeAmount;
        staker.lastClaimedTime = block.timestamp;

        emit Staked(msg.sender, stakeAmount, feeAmount);
    }

    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must > 0");
        
        Staker storage staker = stakers[msg.sender];
        require(staker.amountStaked >= amount, "Insufficient balance");

        _claimReward(msg.sender);

        uint256 feeAmount = (amount * feePercent) / 100;
        uint256 unstakeAmount = amount - feeAmount;

        staker.amountStaked -= amount;

        require(stakingToken.transfer(msg.sender, unstakeAmount), "Transfer failed");
        if (feeAmount > 0) {
            require(stakingToken.transfer(owner(), feeAmount), "Fee transfer failed");
        }

        emit Unstaked(msg.sender, unstakeAmount, feeAmount);
    }

    function claimReward() external nonReentrant {
        require(stakers[msg.sender].amountStaked > 0, "No staked balance");
        _claimReward(msg.sender);
    }

    function _claimReward(address user) internal {
        Staker storage staker = stakers[user];
        if (staker.lastClaimedTime == 0) {
            staker.lastClaimedTime = block.timestamp;
            return;
        }

        uint256 reward = getClaimableReward(user);
        if (reward == 0) {
            staker.lastClaimedTime = block.timestamp;
            return;
        }

        uint256 feeAmount = (reward * feePercent) / 100;
        uint256 rewardAmount = reward - feeAmount;

        require(rewardToken.transfer(user, rewardAmount), "Reward transfer failed");
        if (feeAmount > 0) {
            require(rewardToken.transfer(owner(), feeAmount), "Fee transfer failed");
        }

        staker.lastClaimedTime = block.timestamp;
        staker.rewardDebt += rewardAmount;

        emit RewardClaimed(user, rewardAmount, feeAmount);
    }
}