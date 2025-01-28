import { assets } from '../assets/assets';
import NewsLetterBox from '../Components/NewsLetterBox';
import Title from '../Components/Title';
import { motion } from "motion/react"

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    exit={{ opacity: 0 }}>
      <div className="to-current text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="flex flex-col justify-center sm:flex-row gap-10 my-10 mb-28">
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full sm:max-w-[480px]"
        />

        <div className="flex flex-col justify-center items-start gap-4">
          <p className="font-semibold text-gray-600">Our Info</p>
          <p className="text-gray-500">
            SheShop
            <br />
            Dilshad Garden
            <br />
            Delhi-95
          </p>

          <p className="text-gray-800">
            Tel: <span className="text-gray-500">12345-54321</span>
          </p>
          <p className="text-gray-800">
            Email: <span className="text-gray-500">support@sheshop.com</span>
          </p>

          <p className="text-gray-500">Careers at SheShop</p>
          <p className="text-gray-500">
            Join our team and help us redefine e-commerce for women worldwide.
          </p>

          <button
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            onClick={scrollToTop}
          >
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLetterBox />
    </motion.div>
  );
};

export default Contact;