import React, { useState } from 'react'
import { YahikoButton } from "react-ui-yahiko";
import { ToastContainer,toast } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [userData, setUserData] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    console.log("Submitted the form");

    if (username.length < 8) {
      setError("Username should be at least 8 characters long!");
      return;
    } else {
      setError(""); // Clear error if input is valid
    }

    if (password.length < 8) {
      setErrorPassword("Your password should be at least 8 characters long!");
      return;
    }

    if (!/[!@#$%^&*()<>?]/.test(password)) {
      setErrorPassword("Use at least one special character: !@#$%^&*()");
      return;
    } else {
      setErrorPassword("");
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match!");
      return;
    } else {
      setConfirmError("Password matched");
    }

    // Add user data to state
    setUserData([...userData, { username, email }]);

    // Reset form
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");

    setError("");
    setErrorPassword("");
    setConfirmError("");
    toast('Login is successfull', {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });
  };

  return (
    <div className='h-screen w-full bg-[#191919] relative flex justify-center items-center'>
      <div className='bg-[#101010] py-[2vw] w-[400px] rounded-4xl h-[550px] px-[4vw] flex flex-col items-center'>
        {user ? (
          <h1 className='text-[1.4vw]'>Welcome Back User</h1>
        ) : (
          <h1 className='text-[3vw] md:text-[1.4vw]'>Create account !</h1>
        )}

        {user ? (
          <>
            <form action="" className='w-full mt-10 flex flex-col gap-8'>
              <input
                type='text'
                placeholder='Username'
                className='bg-zinc-700 w-[100%] placeholder-black py-4 rounded-md border-none px-2'
              />
              <input
                type='password'
                placeholder='Password'
                className='bg-zinc-700 w-[100%] placeholder-black py-4 rounded-md border-none px-2'
              />
              <YahikoButton children='Log In' styles={{ backgroundColor: 'white', color: 'black' }} />
            </form>
            <p className='mt-5'>
              Don't have an <a className='underline cursor-pointer' onClick={() => setUser(false)}>account?</a>
            </p>
          </>
        ) : (
          <>
            <form onSubmit={submit} className='w-full mt-5 flex flex-col gap-5'>
              <input
                type='text'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                className='bg-zinc-700 w-[100%] placeholder-black py-3 rounded-md border-none px-2'
              />
              {error && <p className='text-red-600 text-xs text-left'>{error}</p>}

              <input
                required
                type='email'
                placeholder='Email Address'
                className='bg-zinc-700 w-[100%] placeholder-black py-3 rounded-md border-none px-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type='password'
                required
                placeholder='Password'
                className='bg-zinc-700 w-[100%] placeholder-black py-3 rounded-md border-none px-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorPassword && <p className='text-red-600 text-left text-xs'>{errorPassword}</p>}

              <input
                type='password'
                required
                placeholder='Confirm Password'
                className='bg-zinc-700 w-[100%] placeholder-black py-3 rounded-md border-none px-2'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmError && <p className='text-red-600 text-left text-xs'>{confirmError}</p>}

              <YahikoButton children='Register' styles={{ backgroundColor: 'white', color: 'black' }} />

              <p className='text-center'>
                Already have an <a className='underline cursor-pointer' onClick={() => setUser(true)}>account?</a>
              </p>

              <p className='text-xs text-center'>
                By registering, you agree to our <span className='text-pink-400'>Terms & Conditions</span> and <span className='text-pink-400'>Privacy & Policy</span>
              </p>
            </form>
          </>
        )}
      </div>

      {/* Pink Div: Displaying Registered Users */}
      <div className='bg-pink-500 w-[200px] p-5 z-10 left-10 top-10 absolute rounded-lg'>
        <h2 className="text-black font-bold">Registered Users:</h2>
        {userData.length > 0 ? (
          userData.map((data, index) => (
            <p key={index} className="text-white">{data.username} - {data.email}</p>
          ))
        ) : (
          <p className="text-white">No users yet</p>
        )}
      </div>
      <ToastContainer
position="top-center"
autoClose={13}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
}

export default App;
