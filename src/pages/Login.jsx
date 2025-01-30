import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { setIsLoggedIn } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Sign Up');
  const [role, setRole] = useState('Buyer');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    igUsername: '',
    additionalInfo: '',
  });
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Check if there's any logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserDetails(parsedUser);
        setIsLoggedIn(true);
        // If the user is a seller, navigate to the Seller Products page
        if (parsedUser.role === 'Seller') {
          navigate('/seller-products');
        }
      } catch (error) {
        console.error('Error parsing user details from localStorage:', error);
      }
    }
  }, [setIsLoggedIn, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
      role,
    };

    if (currentState === 'Sign Up') {
      userData.name = e.target.name?.value;
      if (role === 'Seller') {
        userData.igUsername = sellerDetails.igUsername;
        userData.additionalInfo = sellerDetails.additionalInfo;
      }
    }

    try {
      const endpoint = currentState === 'Sign Up' ? '/users/signup' : '/users/login';
      const response = await fetch(`http://localhost:5530${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`${currentState} successful!`);
        setIsLoggedIn(true);
        setUserDetails(result.user);

        // Store user details in local storage if "Stay Logged In" is checked
        if (stayLoggedIn) {
          localStorage.setItem('userDetails', JSON.stringify(result.user));
        }

        // Redirect to Seller Products page if the user is a seller
        if (result.user.role === 'Seller') {
          navigate('/seller-products');
        }
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again later.');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('userDetails');
    setIsLoggedIn(false);
    setUserDetails(null);
    navigate('/login');
  };

  return (
    <div>
      {userDetails ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-gray-800 text-center">
          <h2 className="text-3xl font-semibold mb-2">Welcome, {userDetails.name}!</h2>
          <p className="text-lg">Email: {userDetails.email}</p>
          <p className="text-lg">Role: {userDetails.role}</p>

          <div className="flex flex-row gap-8 mt-4">
            {userDetails.role === 'Seller' && (
              <div className="flex flex-col items-center text-lg">
                <p>Instagram Username: {userDetails.igUsername}</p>
                <p>Additional Info: {userDetails.additionalInfo}</p>
              </div>
            )}
          </div>

          {/* Show buttons for Seller role */}
          {userDetails.role === 'Seller' && (
            <div className="flex gap-4 mt-4">
              <Link
                to="/post-product"
                className="px-6 py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
              >
                Add Product
              </Link>
              <Link
                to="/seller-products"
                className="px-6 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600"
              >
                View Products
              </Link>
            </div>
          )}

          <button
            onClick={logoutHandler}
            className="mt-6 px-6 py-2 bg-red-500 text-white text-lg rounded-md shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
          </div>

          <div className="w-full px-3 py-2 flex flex-col gap-4">
            <label className="text-sm text-gray-600">I am a:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <div className="w-full px-3 py-2 flex flex-col gap-4">
            {currentState === 'Sign Up' && (
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Name"
                required
              />
            )}

            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Password"
              required
            />

            {role === 'Seller' && currentState === 'Sign Up' && (
              <>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Instagram Username"
                  value={sellerDetails.igUsername}
                  onChange={(e) => setSellerDetails({ ...sellerDetails, igUsername: e.target.value })}
                  required
                />
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Additional Information"
                  value={sellerDetails.additionalInfo}
                  onChange={(e) => setSellerDetails({ ...sellerDetails, additionalInfo: e.target.value })}
                />
              </>
            )}

            <div className="flex items-center w-full justify-between text-sm mt-[-8px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                />
                Stay Logged In
              </label>
              <button type="button" onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} className="cursor-pointer underline">
                {currentState === 'Login' ? 'Create Account' : 'Login Here'}
              </button>
            </div>
            <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4">
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
