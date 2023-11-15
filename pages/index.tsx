import Header from '../components/header';
import styles from '../styles/Home.module.css'
import Footer from './footer';
import HomeMain from './home';


export default function Home({users}: any) {
  return (
    <>
      <Header />
        <HomeMain/>
      <Footer/>
    </>
  )
}


