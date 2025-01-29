import { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up'); // 'Sign Up' or 'Login'
  const [role, setRole] = useState('Buyer'); // 'Buyer' or 'Seller'
  const [sellerDetails, setSellerDetails] = useState({
    igUsername: '',
    additionalInfo: '',
  });

  const onSubmmitHandler = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ role, currentState, sellerDetails });
  };

  return (
    <form
      onSubmit={onSubmmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3x1">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>

      {/* Role Selection */}
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
        {currentState === 'Sign Up' ? (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Name"
            required
          />
        ) : null}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Password"
          required
        />

        {/* Additional Fields for Sellers */}
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
          <p className=" cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 ">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
