import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImage from "../assets/amico2.png";
import googleImg from "../assets/devicon_google.jpg";
import logoImage from "../assets/material-symbols_robot.png";
import auxibot from "../assets/material-symbols_robot.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useWeb5 } from "../web5Context";
const SignUp = () => {
  const { web5, userDid } = useWeb5();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = constructUserProfile();
      console.log(user);
      const record = await writeToDwn(user);
      console.log(record);
      if (record) {
        const { status } = await record.send(userDid); // send the record to the user's remote DWeb Nodes
        console.log(status);
        console.log(await record.data.text());
        console.log("Send record status", record);

        return navigate("/auxibot");
      } else {
        console.log("no record");
      }
    } catch (error) {
      console.error(error);
    }

    // await fetchDings(web5, userDid);
    // setNoteValue("");
  };

  useEffect(() => {
    if (!web5 || !userDid) return;
  }, [web5, userDid]);

  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (!web5 || !userDid) return;
    // const intervalId = setInterval(async () => {
    //   await fetchDings(web5, userDid);
    // }, 2000);

    // return () => clearInterval(intervalId);
  }, [web5, userDid]);

  const constructUserProfile = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const user = {
      userDid: userDid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      timestampWritten: `${currentDate} ${currentTime}`,
    };
    return user;
  };

  const writeToDwn = async (user) => {
    const { record } = await web5.dwn.records.create({
      data: user,
      message: {
        protocol: "https://didcomm.org/auxi-bot-protocol",
        protocolPath: "user",
        schema: "https://didcomm.org/auxi-bot-protocol/schemas/user.json",
        dataFormat: "application/json",
      },
    });

    return record;
  };

  // const constructChat = (userPrompt, botResponse) => {
  //   const currentDate = new Date().toLocaleDateString();
  //   const currentTime = new Date().toLocaleTimeString();
  //   const chat = {
  //     userDid: userDid,
  //     userPrompt: userPrompt,
  //     botResponse: botResponse,
  //     date: currentDate,
  //     time: currentTime,
  //     timestampWritten: `${currentDate} ${currentTime}`,
  //   };
  //   return chat;
  // };

  // const writeToDwn2 = async (chat) => {
  //   const { record } = await web5.dwn.records.create({
  //     data: chat,
  //     message: {
  //       protocol: "https://didcomm.org/auxi-bot-protocol",
  //       protocolPath: "auxi",
  //       schema: "https://didcomm.org/auxi-bot-protocol/schemas/auxi.json",
  //       dataFormat: "application/json",
  //     },
  //   });

  //   return record;
  // };

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
          </div>
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
        <div className="w-[354px] text-center text-black text-[20px] sm:text-[30px] font-semibold font-Sora">
          Hello!, own your info for a smooth experience
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

export default SignUp;
