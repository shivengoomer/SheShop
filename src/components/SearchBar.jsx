import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { products, search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(showSearch);
  const [animate, setAnimate] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
      setAnimate('animate-scale-up-center');
    } else {
      setAnimate('animate-scale-down-center');
      setTimeout(() => setVisible(false), 400);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (search.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [search, products]);

  const handleClose = () => {
    setAnimate('animate-scale-down-center');
    setTimeout(() => setShowSearch(false), 400);
  };

  const handleSearch = () => {
    if (search.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return visible && showSearch ? (
    <div className={`border-t border-b bg-gray-50 text-center ${animate}`}>
      <div className="w-[450px] inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-8 rounded-full">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt="Search" className="w-4 cursor-pointer" onClick={handleSearch} />
      </div>
      {filteredProducts.length > 0 && (
        <div className="bg-white shadow-md rounded-md max-w-md mx-auto overflow-y-auto max-h-60">
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-2 border-b flex items-center cursor-pointer hover:bg-gray-100">
              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover mr-3" />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
      <img
        src={assets.cross_icon}
        alt="Close"
        className="w-4 h-4 ml-3 inline cursor-pointer"
        onClick={handleClose}
      />
    </div>
  ) : null;
};

export default SearchBar;
