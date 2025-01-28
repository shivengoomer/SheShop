import BestSeller from '../Components/BestSeller';
import Hero from '../Components/Hero';
import LatestCollection from '../Components/LatestCollection';
import NewsLetterBox from '../Components/NewsLetterBox';
import OurPolicies from '../Components/OurPolicies';
import { motion } from "motion/react"
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      >
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicies />
      <NewsLetterBox />
    </motion.div>
  );
};

export default Home;
