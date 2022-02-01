import About from '../components/About';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import PageTransition from '../components/PageTransition';
import Testimonials from '../components/Testimonials';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <PageTransition>
      <ToastContainer />
      <Header />
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Contact />
      <Footer />
    </PageTransition>
  );
};

export default Home;
