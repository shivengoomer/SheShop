import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [LatestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    }, [])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'Latest'} text2={'Collections'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque harum, fuga, voluptatum dolorum odio a repellat natus doloribus nobis nulla deleniti eum similique labore impedit inventore sapiente delectus soluta? Expedita consectetur laborum, eius ad, explicabo nemo voluptatibus impedit quod laboriosam itaque corrupti eveniet mollitia eaque nihil iusto dolor a minima magnam delectus unde accusantium. Tempora distinctio molestiae voluptas, cumque animi harum quaerat suscipit neque!</p>
        </div>
      
    </div>
  )
}

export default LatestCollection
