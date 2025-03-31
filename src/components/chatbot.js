import React, { useState } from "react";
import "./chatbot.css";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import axios from "axios"; // Import axios

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.post(
        "http://localhost:3000/api/auth/generate", // Replace with your API endpoint
        { prompt: input }, // Send prompt in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Important: Set content type
          },
        }
      );

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching from API:", error);
      let errorMessage = "Sorry, I encountered an error.";
      if (error.response && error.response.data && error.response.data.error){
          errorMessage = error.response.data.error;
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: errorMessage, sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
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
            {loading && <div className="chat-message bot">Loading...</div>}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend} disabled={loading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;