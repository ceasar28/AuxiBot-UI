import React, { useEffect, useState } from "react";
import del from "../assets/material-symbols_delete-outline.png";
import { useWeb5 } from "../web5Context";

const RecentChat = () => {
  const { web5, userDid } = useWeb5();
  const [allChats, setAllChats] = useState([]);
  const [filteredChats, setFilteredChat] = useState([]);
  const storedText = JSON.parse(localStorage.getItem("userText")) || [];

  const filterchatbydates = (chat) => {
    const groupedByDate = chat.reduce((arr, obj) => {
      const date = obj.date;
      if (!arr[date]) {
        arr[date] = [];
      }
      arr[date].push(obj);
      return arr;
    }, {});

    // Extracting values (arrays of objects) from the grouped object
    const groupedArray = Object.values(groupedByDate);

    return groupedArray;
  };

  const deleteStoredText = (index) => {
    const updatedText = storedText.filter((_, i) => i !== index);
    localStorage.setItem("userText", JSON.stringify(updatedText));
    window.location.reload();
  };

  useEffect(() => {
    if (web5 && userDid) {
      console.log("loading now...");
      const retrieveData = async () => {
        console.log("Fetching saved Chats...");
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              filter: {
                protocol: "https://didcomm.org/auxi-bot-protocol",
                schema:
                  "https://didcomm.org/auxi-bot-protocol/schemas/auxi.json",
              },
            },
          });

          console.log("API Response:", status);

          if (status.code === 200) {
            const allChatlogs = await Promise.all(
              records.map(async (record) => {
                const data = await record.data.json();
                return data;
              })
            );
            console.log("This is data you need...", allChatlogs);
            setAllChats([...allChatlogs]);
            const filteredArray = filterchatbydates([...allChatlogs]);
            setFilteredChat([...filteredArray]);
            console.log("filtered array :", filteredChats);
          } else {
            console.error("Error fetching all chats:", status.detail);
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
  }, [web5, userDid, allChats, filteredChats]);

  return (
    <div
      className="w-[14rem] flex flex-col items-start justify-between overflow-y-auto"
      style={{ maxHeight: "45vh" }}
    >
      {filteredChats.map((chat, index) => (
        <div
          key={index}
          className="ChatName w-[14rem] flex items-center justify-between text-start text-white text-lg font-medium font-['Inter']"
        >
          <div className=""> {chat[0].date}</div>
          <img
            src={del}
            alt="Delete"
            className="w-3.5 h-3.5 cursor-pointer"
            onClick={() => deleteStoredText(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecentChat;
