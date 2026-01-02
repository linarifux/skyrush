import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import AboutSection from '../components/home/AboutSection';
import Footer from '../components/shared/Footer';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;