import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImage from "../assets/amico.png";
import googleImg from "../assets/devicon_google.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import logoImage from '../assets/material-symbols_robot.png';
import auxibot from '../assets/material-symbols_robot.jpg';


// import { toast } from "react-toastify";

// import auxiBotProtocol from "../utils/protocol.json";
const Login = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let loading = toast.loading("loading");
    // // to check available protocols
    // const { protocols } = await web5.dwn.protocols.query({
    //   message: {
    //     filter: {
    //       protocol: "https://didcomm.org/auxi-bot-protocol",
    //     },
    //   },
    // });
    // console.log("procols available :", protocols);

    const user = constructUserProfile();
    console.log(user);
    const record = await writeToDwn(user);
    console.log(record);
    if (record) {
      const { status } = await record.send(myDid); // send the record to the user's remote DWeb Nodes
      console.log(status);
      console.log(await record.data.text());
      console.log("Send record status", record);
      // toast.update(loading, {
      //   render: `Succesfully connected`,
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 3000, // Optional: Close the toast after 3 seconds
      // });
      return navigate("/");
    } else {
      console.log("no record");
    }

    // await fetchDings(web5, myDid);
    // setNoteValue("");
  };

  const [message, setMessage] = useState(false);

  const createProtocolDefinition = () => {
    const auxiBotProtocolDefinition = {
      protocol: "https://didcomm.org/auxi-bot-protocol",
      published: true,
      types: {
        user: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/user.json",
          dataFormats: ["application/json"],
        },
        auxi: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/auxi.json",
          dataFormats: ["application/json"],
        },
        todo: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/todo.json",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        user: {
          $actions: [
            {
              who: "anyone",
              can: "read",
            },
            {
              who: "anyone",
              can: "write",
            },
          ],
          todo: {
            $actions: [
              {
                who: "anyone",
                can: "read",
              },
              {
                who: "anyone",
                can: "write",
              },
            ],
          },
          auxi: {
            $actions: [
              { who: "anyone", can: "write" },
              { who: "anyone", can: "read" },
              { who: "anyone", can: "read" },
            ],
          },
        },
      },
    };
    return auxiBotProtocolDefinition;
  };

  const queryForProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://didcomm.org/auxi-bot-protocol",
        },
      },
    });
  };

  const installProtocolLocally = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  const configureProtocol = async (web5, did) => {
    const protocolDefinition = await createProtocolDefinition();

    const { protocols: localProtocol, status: localProtocolStatus } =
      await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });
    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
      const { protocol, status } = await installProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol.send(did);
      console.log(
        "Did the protocol install on the remote DWN?",
        configureRemoteStatus
      );
    } else {
      console.log("Protocol already installed");
    }
  };

  useEffect(() => {
    const initWeb5 = async () => {
      const { Web5 } = await import("@web5/api");
      try {
        const { web5, did } = await Web5.connect();
        setWeb5(web5);
        setMyDid(did);

        if (web5 && did) {
          console.log(web5);
          console.log(did);
          await configureProtocol(web5, did);
          // await fetchDings(web5, did);
        }
      } catch (error) {
        console.log("initializing web5 error");
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

  const constructUserProfile = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const user = {
      userDid: myDid,
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

  return (
    <div className="w-full min-h-full flex justify-between bg-white">

      <div className="Logo flex items-center mt-5 ml-5 absolute cursor-pointer ">
        <Link to='/'>  <div className="flex items-center cursor-pointer">
          <img src={logoImage} alt="Logo" className="h-8 mr-2 top-[3.5rem] left-[1.6rem]" />

          <div className=" text-center text-white text-2xl font-semibold font-['Inter']"> AuxiBot<br /></div>

        </div>
        </Link>
        <Link to='/'>  <div className="flex items-center cursor-pointer ms:hidden">
          <img src={auxibot} alt="Logo" className="h-8 mr-2 absolute top-[0rem] left-[0rem]" />

          <div className=" text-center text-primary-600 absolute top-[0rem] left-[2.6rem] text-2xl font-semibold font-['Inter']"> AuxiBot<br /></div>

        </div>
        </Link>
      </div>
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
