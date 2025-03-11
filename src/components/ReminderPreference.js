import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa"; // Import icons
import "./ReminderPreference.css";

const ReminderPreference = () => {
    const navigate = useNavigate();
    const [morningTime, setMorningTime] = useState("08:00");
    const [afternoonTime, setAfternoonTime] = useState("13:00");
    const [nightTime, setNightTime] = useState("22:00"); // Default night time

    // Show popup message on page load
    useEffect(() => {
        alert("You can set your reminder preferences. By default, the night reminder is set to 10:00 PM.");
    }, []);

    const handleSave = () => {
        // Save the selected times (you can use state management or API calls here)
        console.log("Morning Time:", morningTime);
        console.log("Afternoon Time:", afternoonTime);
        console.log("Night Time:", nightTime);

        // Navigate to the Dashboard
        navigate("/dashboard");
    };

    // Function to format time with AM/PM
    const formatTimeWithAMPM = (time) => {
        const [hours, minutes] = time.split(":");
        const parsedHours = parseInt(hours, 10);
        const ampm = parsedHours >= 12 ? "PM" : "AM";
        const formattedHours = parsedHours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="reminder-preference-container">
            <div className="reminder-preference-card">
                <h2 className="reminder-preference-title">Set Your Reminder Preferences</h2>
                <p className="reminder-preference-subtitle">
                    Choose your preferred reminder times for morning, afternoon, and night.
                </p>

                {/* Morning Reminder */}
                <div className="reminder-section">
                    <div className="icon-time-container">
                        <div className="reminder-icon">
                            <FaSun size={24} color="#FFD700" /> {/* Morning icon */}
                        </div>
                        <input
                            type="time"
                            value={morningTime}
                            onChange={(e) => setMorningTime(e.target.value)}
                            className="time-input"
                        />
                        <span className="time-ampm">{formatTimeWithAMPM(morningTime)}</span>
                    </div>
                    <p className="reminder-label">Morning</p>
                </div>

                {/* Afternoon Reminder */}
                <div className="reminder-section">
                    <div className="icon-time-container">
                        <div className="reminder-icon">
                            <FaCloudSun size={24} color="#FFA500" /> {/* Afternoon icon */}
                        </div>
                        <input
                            type="time"
                            value={afternoonTime}
                            onChange={(e) => setAfternoonTime(e.target.value)}
                            className="time-input"
                        />
                        <span className="time-ampm">{formatTimeWithAMPM(afternoonTime)}</span>
                    </div>
                    <p className="reminder-label">Afternoon</p>
                </div>

                {/* Night Reminder */}
                <div className="reminder-section">
                    <div className="icon-time-container">
                        <div className="reminder-icon">
                            <FaMoon size={24} color="#000080" /> {/* Night icon */}
                        </div>
                        <input
                            type="time"
                            value={nightTime}
                            onChange={(e) => setNightTime(e.target.value)}
                            className="time-input"
                        />
                        <span className="time-ampm">{formatTimeWithAMPM(nightTime)}</span>
                    </div>
                    <p className="reminder-label">Night</p>
                </div>

                {/* OK Button */}
                <button onClick={handleSave} className="ok-button">
                    OK
                </button>
            </div>
        </div>
    );
};

export default ReminderPreference;