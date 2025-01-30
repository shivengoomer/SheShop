import { assets } from '../assets/assets';
import kid1 from '../myassets/kid1.jpg';
import kid2 from '../myassets/kid3.jpg';
import belt from '../myassets/belt.jpg';
import jacket from '../myassets/jacket.jpg';
import cosmetics from '../myassets/cosmetics.jpg';
import jack from '../myassets/jacket.jpg';
import lower from '../myassets/lower.jpg';
import { img } from 'motion/react-client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const data = [
  kid1,
  kid2,
  belt,
  jacket,
  cosmetics,
  jack,
  lower,
];
const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase : 'linear',
  };
  
  return (
    <div className="flex flex-col sm:flex-row border      border-gray-400 ">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 ">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-extrabold text-sm md:text-xl ">Local Creations</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-6xl leading-relaxed ">
            {' '}
             SHOP NOW
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-extrabold text-sm md:text-xl ">Global Sensations</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}

      {/* <img src={assets.hero_img} alt="" className="w-full sm:w-1/2" /> */}
      <div className='w-full sm:w-1/2 flex flex-col justify-center h-[500px]  bg-white-400 p-8'>
      <Slider {...settings}>
        {data.map((d) => (
          <img src={d} alt="" className="w-full sm:w-full h-[500px] object-contain justify-center overflow-hidden" />
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default Hero;
