import React, { useState } from "react";
import "./chatbot.css";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "I'm still learning, but I'll try my best!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-icon" onClick={toggleChatbot}>
          <FaRobot />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Finai Chatbot</span>
            <FaTimes className="close-icon" onClick={toggleChatbot} />
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
