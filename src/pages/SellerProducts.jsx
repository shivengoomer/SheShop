import { useEffect, useState } from 'react';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5530/products/seller', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if necessary
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center my-4">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded-md">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
