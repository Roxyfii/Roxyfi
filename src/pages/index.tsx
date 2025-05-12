import Utility from "@/component/utility";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import styles from '@/styles/LandingPage.module.css';
import HeroSection from "@/component/herosection";
export default function Home() {
  return (
    <div className={styles.LandingPage}>
      <Navbar/>
      <HeroSection/>
      <Utility/>
      <Footer/>
    </div>
  );
}
