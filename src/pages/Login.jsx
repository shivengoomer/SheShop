import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [role, setRole] = useState('Buyer');
  const [sellerDetails, setSellerDetails] = useState({
    igUsername: '',
    additionalInfo: '',
  });
  const [userDetails, setUserDetails] = useState(null); // State to store user details after login

  const navigate = useNavigate();

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
        console.log(result);  // Log user data or success message
        if (currentState === 'Login') {
          setUserDetails(result.user); // Store user details after successful login
        }
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again later.');
    }
  };

  return (
    <div>
      {userDetails ? (
        <div className="user-details">
          <h2>Welcome, {userDetails.name}!</h2>
          <p>Email: {userDetails.email}</p>
          {userDetails.role === 'Seller' && (
            <>
              <p>Instagram Username: {userDetails.igUsername}</p>
              <p>Additional Info: {userDetails.additionalInfo}</p>
            </>
          )}
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
                  onChange={(e) =>
                    setSellerDetails({ ...sellerDetails, igUsername: e.target.value })
                  }
                  required
                />
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Additional Information"
                  value={sellerDetails.additionalInfo}
                  onChange={(e) =>
                    setSellerDetails({ ...sellerDetails, additionalInfo: e.target.value })
                  }
                />
              </>
            )}

            <div className="w-full flex justify-between text-sm mt-[-8px]">
              <p className="cursor-pointer">Forgot your password?</p>
              {currentState === 'Login' ? (
                <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
                  Create Account
                </p>
              ) : (
                <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
                  Login Here
                </p>
              )}
            </div>
            <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 ">
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
