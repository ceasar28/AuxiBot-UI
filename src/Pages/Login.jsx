import React from 'react'
import loginImage from '../assets/amico.png';
import googleImg from '../assets/devicon_google.jpg'
const Login = () => {
    return (
        <div className="w-full min-h-full flex justify-between bg-white">
            <div className="w-[45vw] min-h-[100vh] bg-violet-900 flex justify-center items-center">
                <img
                    src={loginImage}
                    alt="Logo"
                    className="w-[70%]"
                />
            </div>
            <div className="w-[60vw] min-h-[100vh] rounded-tl-[40px] rounded-bl-[40px] bg-white absolute right-0 flex flex-col justify-center items-center">
                <div className="w-[354px] h-[52px] text-center text-black text-[40px] font-semibold font-['Inter']">Welcome Back</div>
                <div className="w-[450px] h-[60px] rounded-[10px] border border-neutral-900 border-opacity-75 justify-center flex items-center gap-6">
                    <img
                        src={googleImg}
                        alt="Logo"
                        className="w-6 h-6"
                    />
                    <div className="text-center text-neutral-900 text-opacity-95 text-xl font-medium font-['Inter']">Sign Up with Google</div>
                </div>
                <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']">OR</div>

                <form>

                    <div className="w-[76px] h-[33px] text-center text-black text-[23px] font-medium font-['Inter']">Email</div>
                    <div className="w-[450px] h-[60px] bg-gray-200" />

                    <div className="w-[110px] h-[33px] text-center text-black text-[23px] font-medium font-['Inter']">Password</div>
                    <div className="w-[450px] h-[60px] bg-gray-200" />

                    <div className="w-[180px] h-7 text-center text-blue-800 text-lg font-normal font-['Inter']">Forgotten Password</div>
                    <div className="w-[450px] h-[60px] bg-blue-900 rounded-[10px]" />
                </form>

                <div>
                    <div className="w-[313px] h-[33px] text-center text-black text-[23px] font-medium font-['Inter']">Don’t have an account?</div>
                    <div className="w-[105px] h-[33px] text-center text-blue-800 text-[23px] font-medium font-['Inter']">Register</div>
                </div>
            </div>
        </div>
    )
}

export default Login
