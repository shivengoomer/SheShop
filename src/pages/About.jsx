import { assets } from '../assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';
import Title from '../Components/Title';
import { motion } from "motion/react"

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px] "
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            SheShop was founded with a mission to empower women by providing a
            curated platform for discovering and purchasing products that align
            with their unique tastes, needs, and aspirations. From fashion to
            wellness, we aim to celebrate and support women at every stage of
            life.
          </p>
          <p>
            Since our inception, we&apos;ve worked tirelessly to build a
            community-driven marketplace that champions quality, diversity, and
            inclusivity. Our platform features a handpicked selection of
            products sourced from trusted brands that share our commitment to
            excellence and sustainability.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At SheShop, our mission is to inspire confidence and celebrate
            individuality by offering a seamless shopping experience designed
            for modern women. We strive to create a space where every customer
            feels valued, understood, and empowered.
          </p>
        </div>
      </div>

      <div className="py-4 text-2xl">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row mb-20 text-sm gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Empowering Women</b>
          <p className="text-gray-600">
            At SheShop, we prioritize products and brands that align with our
            mission of empowering women, ensuring your purchases make a
            difference.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Seamless Experience</b>
          <p className="text-gray-600">
            Our intuitive website and app are designed to make your shopping
            experience smooth and enjoyable, no matter where you are.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Community Support</b>
          <p className="text-gray-600">
            Our dedicated support team and community initiatives ensure every
            customer feels heard, supported, and valued.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </motion.div>
  );
};

export default About;