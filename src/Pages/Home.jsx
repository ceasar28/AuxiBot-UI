import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import send from "../assets/ion_send.png";
import calendar from "../assets/ri_calendar-todo-fill.png";
import { FiMenu, FiChevronLeft } from "react-icons/fi";
import logoImage from "../assets/material-symbols_robot.png";
import RightSidebar from "../screen/RightSidebar";
import LeftSidebar from "../screen/LeftSidebar";
import WelcomeMessage from "../screen/WelcomeMessage";
import ChatArea from "../screen/ChatArea";
import Response from "../screen/Response";
import { Link } from "react-router-dom";
import { useWeb5 } from "../web5Context";

const Home = () => {
  const { web5, userDid } = useWeb5();
  const navigate = useNavigate();
  const [profile, setUserprofile] = useState([]);
  const [fName, setFname] = useState("Anonymous");
  const [text, setText] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [showRecentChat, setShowRecentChat] = useState(true);
  const [showUpcomingEvent, setShowUpcomingEvent] = useState(true);
  const [showTextChat, setShowTextChat] = useState(true);
  const [Message, setMessage] = useState(true);
  const [chatAreaVisible, setChatAreaVisible] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);
  const [chats, setChats] = useState([]);

  const storedText = JSON.parse(localStorage.getItem("userText")) || [];

  const handleChange = (event) => {
    setText(event.target.value);
  };

  console.log("chats", chats);

  const handleSend = async () => {
    const payload = {
      query: text,
    };
    if (payload.query.trim() !== "") {
      try {
        if (profile) {
          const response = await fetch(
            "https://auxi-bot.onrender.com/api/bot/palm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Specify the content type
              },
              body: JSON.stringify(payload), // Convert data to JSON string
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          setText("");
          setMessage(false);
          setChatAreaVisible(true);
          setResponseVisible(true);
          const { data } = await response.json(); // Parse response JSON
          if (data) {
            console.log("Post request successful:", data);
            setChats([
              ...chats,
              {
                author: data.messages[0].content,
                bot: data.candidates[0].content,
              },
            ]);
          }
        } else {
          return navigate("/profile");
        }
      } catch (error) {
        console.error("There was a problem with the POST request:", error);
      }

      //   let userText = JSON.parse(localStorage.getItem("userText")) || [];
      //   userText.push(text);
      //   localStorage.setItem("userText", JSON.stringify(userText));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
      setMessage(false);
      setChatAreaVisible(true);
      setResponseVisible(true);
      setText(""); // Clear the input field after hitting Enter
    }
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setShowRecentChat(!sidebarExpanded);
    setShowUpcomingEvent(!sidebarExpanded);
    setShowTextChat(!sidebarExpanded);
  };

  const [menuClicked, setMenuClicked] = useState(false);

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
            setFname([...userProfile][0].firstName);
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
  }, [web5, userDid, fName]);

  useEffect(() => {
    console.log("fname", fName);
    function handleResize() {
      if (window.innerWidth > 768) {
        setSidebarExpanded(true);
        setShowRecentChat(true);
        setShowUpcomingEvent(true);
        setShowTextChat(true);
      } else {
        setSidebarExpanded(true);
        setShowRecentChat(false);
        setShowUpcomingEvent(false);
        setShowTextChat(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-row justify-between">
      {window.innerWidth <= 768 ? (
        <div className="w-[4rem] min-h-[100vh]"></div>
      ) : (
        <div className="w-[17rem] min-h-[100vh]"></div>
      )}
      <div
        className="w-[80vw] sm:w-[60vw] flex m-auto flex-col items-start justify-between overflow-y-auto mb-[12vh]"
        style={{ maxHeight: "90vh", minHeight: "40vh" }}
      >
        {Message && <WelcomeMessage fName={fName} />}

        {!Message && (
          <div className="messages">
            {chats.map((chat, index) => (
              <div key={index} className="message">
                <ChatArea message={chat.author} fName={fName} />
                <Response message={chat.bot} />
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-[0rem] w-[80vw] sm:w-[60vw] ">
          <div className="">
            <textarea
              placeholder="Start a conversation"
              className="w-full max-h-20rem min-h-20px h-auto rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] mb-[1rem] resize-none font-Sora font-medium text-[14px] xs:text-[16px] overflow-auto m-2"
              value={text}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <img
              src={calendar}
              alt="Logo"
              className="w-6 h-6 absolute bottom-[15%] right-[5rem] transform translate-y-[-90%] cursor-pointer"
              onClick={toggleRightSidebar}
            />
            <div
              className="w-[30px] h-[30px] bg-violet-900 rounded-[29px] pb-1 pl-1 flex justify-center items-center absolute bottom-[5%] right-[1rem] transform translate-y-[-90%] cursor-pointer"
              onClick={handleSend}
            >
              <img src={send} alt="Logo" className="w-6 h-6 " />
            </div>
          </div>
        </div>
      </div>

      <LeftSidebar
        fName={fName}
        windowWidth={window.innerWidth}
        sidebarExpanded={sidebarExpanded}
        showRecentChat={showRecentChat}
        showUpcomingEvent={showUpcomingEvent}
        showTextChat={showTextChat}
      />

      <div className="Logo flex items-center mt-5 ml-5 absolute cursor-pointer">
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
      </div>

      {window.innerWidth <= 768 && (
        <div className="ToggleIcon p-2 mb-2 cursor-pointer absolute">
          {(!menuClicked || window.innerWidth <= 768) && (
            <FiMenu
              className="text-white text-lg absolute top-[3.5rem] left-[1.6rem]"
              onClick={() => {
                handleToggleSidebar();
                setMenuClicked(true);
              }}
            />
          )}
          {(!menuClicked || window.innerWidth > 768) && (
            <FiChevronLeft
              className="text-white absolute text-lg top-[1.6rem] left-[15rem]"
              onClick={() => {
                handleToggleSidebar();
                setMenuClicked(true);
              }}
            />
          )}
        </div>
      )}

      <RightSidebar
        rightSidebarOpen={rightSidebarOpen}
        toggleRightSidebar={toggleRightSidebar}
        showRecentChat={showRecentChat}
      />
    </div>
  );
};

export default Home;
