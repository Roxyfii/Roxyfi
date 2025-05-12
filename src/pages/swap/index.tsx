
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import SwapPage from "@/component/swap";
import styles from '@/styles/layer2.module.css'
export default function Home() {
  return (
    <div className={styles.layer2}>
      <Navbar/>
        <SwapPage/>
      <Footer/>
    </div>
  );
}
