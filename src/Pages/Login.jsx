import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import loginImage from '../assets/amico.png';
import googleImg from '../assets/devicon_google.jpg'
import Input from '../Components/Input';
import Button from '../Components/Button';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const [message, setMessage] = useState(false)
    return (
        <div className="w-full min-h-full flex justify-between bg-white">
            <div className="w-[45vw] min-h-[100vh] bg-violet-900 hidden ms:flex justify-center items-center">
                <img
                    src={loginImage}
                    alt="Logo"
                    className="w-[70%] mr-12"
                />
            </div>
            <div className="w-[60vw] min-h-[100vh] rounded-tl-[40px] rounded-bl-[40px] bg-white ms:absolute right-0 flex flex-col justify-center items-center m-auto">
                <div className="w-[354px] text-center text-black text-[20px] sm:text-[30px] font-semibold font-['Inter']">Welcome Back</div>

                <button className="w-full h-[50px] ss:w-[475px] mt-[1rem] input__tag border-2 hover:btn-hover font-Sora text-[16px] sm:text-[20px] rounded-[10px] border-neutral-900 border-opacity-75 justify-around flex items-center mb-[14px] m-auto p-1">
                    <img
                        src={googleImg}
                        alt="Logo"
                        className="w-6 h-6"
                    />
                    <div className="text-center text-neutral-900 text-opacity-95 font-medium font-['Inter']">Sign Up with Google</div>
                </button>
                <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']">OR</div>

                <form className="flex flex-col w-full ss:w-[475px]" onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div>
                        <p className="text-[16px] font-Sora font-medium mb-[14px]">
                            Email
                        </p>
                        <Input
                            type={'text'}
                            placeholder="Enter your Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <p className="text-[16px] font-Sora font-medium mb-[14px]">
                            Password
                        </p>
                        <div className="relative w-full">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {/* Toggle password visibility button */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="password-toggle-button text-xl absolute top-[50%] right-[1rem] transform translate-y-[-90%]"
                            >
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className={"w-full h-[50px] mt-[1rem] input__tag border-2 border-primary-600 rounded-md hover:btn-hover font-Sora text-[16px] xs:text-[16px] bg-primary-600 text-white"}
                    >
                        Log In
                    </Button>
                    <Link to='#'>
                        <p className="text-[16px] font-Sora mt-2 font-medium mb-[14px]">
                            Forgot Password?
                        </p>
                    </Link>

                    {message && (
                        <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
                            {message}
                        </p>
                    )}
                    <h2 className="mt-[1rem] text-center text-[16px] text-primary-400 tracker-medium font-semibold font-Work-Sans">
                        Don&apos;t Have Account?{' '}
                        <Link to='/SignUp'>
                            <span className="font-bold hover:underline cursor-pointer font-Sora">
                                Register
                            </span>
                        </Link>
                    </h2>
                </form>

            </div>
        </div>
    )
}

export default Login
