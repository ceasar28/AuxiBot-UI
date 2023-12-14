import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImage from "../assets/amico.png";
import googleImg from "../assets/devicon_google.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import logoImage from "../assets/material-symbols_robot.png";
import auxibot from "../assets/material-symbols_robot.jpg";
import { useWeb5 } from "../web5Context";
// import { toast } from "react-toastify";

// import auxiBotProtocol from "../utils/protocol.json";
const Login = () => {
  const { web5, userDid } = useWeb5();
  const navigate = useNavigate();
  const [profile, setUserprofile] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profile) {
      return navigate("/auxibot");
    } else {
      console.log("no record");
      return navigate("/profile");
    }
  };

  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (web5 && userDid) {
      console.log("loading now...");
      const retrieveData = async () => {
        console.log("Fetching saved profile...");
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              filter: {
                protocol: "https://didcomm.org/auxi-bot-protocol",
                schema:
                  "https://didcomm.org/auxi-bot-protocol/schemas/user.json",
              },
            },
          });

          console.log("API Response:", status);

          if (status.code === 200) {
            const userProfile = await Promise.all(
              records.map(async (record) => {
                const data = await record.data.json();
                return data;
              })
            );
            console.log("This is data you need...", userProfile);
            setUserprofile([...userProfile]);
          } else {
            console.error("Error fetching sent messages:", status.detail);
            // Handle specific error cases or show an error message to the user.
          }
        } catch (error) {
          console.error("Oops, this happened", error);
          // Handle unexpected errors here.
        }
      };

      retrieveData();
    } else {
      console.log("not ready");
    }
  }, [web5, userDid, profile]);

  return (
    <div className="w-full min-h-full flex justify-between bg-white">
      <div className="Logo flex items-center mt-5 ml-5 absolute cursor-pointer ">
        <Link to="/">
          {" "}
          <div className="flex items-center cursor-pointer">
            <img
              src={logoImage}
              alt="Logo"
              className="h-8 mr-2 top-[3.5rem] left-[1.6rem]"
            />

            <div className=" text-center text-white text-2xl font-semibold font-['Inter']">
               AuxiBot
              <br />
            </div>
          </div>
        </Link>
        <Link to="/">
          {" "}
          <div className="flex items-center cursor-pointer ms:hidden">
            <img
              src={auxibot}
              alt="Logo"
              className="h-8 mr-2 absolute top-[0rem] left-[0rem]"
            />

            <div className=" text-center text-primary-600 absolute top-[0rem] left-[2.6rem] text-2xl font-semibold font-['Inter']">
               AuxiBot
              <br />
            </div>
          </div>
        </Link>
      </div>
      <div className="w-[45vw] min-h-[100vh] bg-violet-900 hidden ms:flex justify-center items-center">
        <img src={loginImage} alt="Logo" className="w-[70%] mr-12" />
      </div>
      <div className="w-[60vw] min-h-[100vh] rounded-tl-[40px] rounded-bl-[40px] bg-white ms:absolute right-0 flex flex-col justify-center items-center m-auto">
        <div className="w-[354px] text-center text-black text-[20px] sm:text-[30px] font-semibold font-['Inter']">
          Join the Future with AuxiBot
        </div>
        <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']"></div>

        <form
          className="flex flex-col w-full ss:w-[475px]"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          {/* <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              First Name
            </p>
            <Input
              type={"text"}
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div> */}
          {/* <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              Last Name
            </p>
            <Input
              type={"text"}
              placeholder="Last NAME"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">Email</p>
            <Input
              type={"text"}
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div> */}
          <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
            Embrace the future of intelligent assistance with AuxiBot. Whether
            you're an individual, a business professional,unlock new
            possibilities, and simplify your life with our AI-powered assistant.
          </p>
          <Button
            onClick={handleSubmit}
            className={
              "w-full h-[50px] mt-[1rem] input__tag border-2 border-primary-600 rounded-md hover:btn-hover font-Sora text-[16px] xs:text-[16px] bg-primary-600 text-white"
            }
          >
            Get Started
          </Button>

          {message && (
            <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
