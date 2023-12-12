import React, { useState, useEffect } from "react";
import { Web5 } from "@web5/api/browser";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImage from "../assets/amico.png";
import googleImg from "../assets/devicon_google.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
const Login = () => {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setfirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setlastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [message, setMessage] = useState(false);

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);

      if (web5 && did) {
        console.log(web5);
        console.log(did);
        // await configureProtocol(web5, did);
        // await fetchDings(web5, did);
      }
    };
    initWeb5();
  }, []);

  useEffect(() => {
    if (!web5 || !myDid) return;
    // const intervalId = setInterval(async () => {
    //   await fetchDings(web5, myDid);
    // }, 2000);

    // return () => clearInterval(intervalId);
  }, [web5, myDid]);
  return (
    <div className="w-full min-h-full flex justify-between bg-white">
      <div className="w-[45vw] min-h-[100vh] bg-violet-900 hidden ms:flex justify-center items-center">
        <img src={loginImage} alt="Logo" className="w-[70%] mr-12" />
      </div>
      <div className="w-[60vw] min-h-[100vh] rounded-tl-[40px] rounded-bl-[40px] bg-white ms:absolute right-0 flex flex-col justify-center items-center m-auto">
        <div className="w-[354px] text-center text-black text-[20px] sm:text-[30px] font-semibold font-['Inter']">
          Hello! Welcome
        </div>
        <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']"></div>

        <form
          className="flex flex-col w-full ss:w-[475px]"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              First Name
            </p>
            <Input
              type={"text"}
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
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
          </div>

          <Button
            onClick={handleSubmit}
            className={
              "w-full h-[50px] mt-[1rem] input__tag border-2 border-primary-600 rounded-md hover:btn-hover font-Sora text-[16px] xs:text-[16px] bg-primary-600 text-white"
            }
          >
            Connect to Web5
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
