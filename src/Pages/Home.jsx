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
    const [loading, setLoading] = useState(false);


    const storedText = JSON.parse(localStorage.getItem("userText")) || [];

    const handleChange = (event) => {
        setText(event.target.value);
    };

    console.log("chats", chats);

    const handleSend = async () => {
        setLoading(true);
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
            } finally {
                setLoading(false); // Set loading to false once the request is done
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
        <div className="min-h-[100vh] flex flex-row">
            {window.innerWidth <= 768 ? (
                <div className="w-[15vw] min-h-[100vh]"></div>
            ) : (
                <div className=" w-[35vw] ms:w-[30vw] md:w-[20vw] min-h-[100vh]"></div>
            )}
            <div
                className="w-[75vw] sm:w-[60vw] flex m-auto flex-col items-start  justify-end overflow-y-scroll overflow-x-hidden"
                style={{ maxHeight: "80vh", minHeight: "10vh" }}
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

                <div className="fixed bottom-0 flex items-center justify-center w-[75vw] sm:w-[60vw] m-auto"> 
                    <div className="">
                        <textarea
                            placeholder="Start a conversation"
                            className="w-[75vw] sm:w-[60vw] max-h-[20rem] min-h-[2rem] h-auto rounded-lg border-2 border-solid border-black-400 outline-none pl-[1rem] pt-1rem mb-[1rem] resize-none font-Sora font-medium text-[14px] xs:text-[16px] overflow-auto m-2 justify-center items-center flex focus:ring-violet-900 focus:border-violet-900"
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

            <div className="Logo flex items-center mt-5 ml-2.5 absolute cursor-pointer">
                <Link to="/">
                    {" "}
                    <div className="flex items-center cursor-pointer">
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="h-8 mr-2 top-[3.5rem] left-[1.6rem]"
                        />

                        <div className=" text-center text-white text-2xl font-semibold font-['Inter'] hidden sm:block">
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
                            className="text-white text-lg absolute top-[3.5rem] left-[1.0rem]"
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
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-600"></div>
                </div>
            )}
        </div>
    );
};

export default Home;
