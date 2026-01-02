import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import AboutSection from '../components/home/AboutSection';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <AboutSection />
    </div>
  );
};

export default Home;