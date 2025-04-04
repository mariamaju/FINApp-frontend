import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLandmark,
  FaEdit, 
  FaSave 
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    bankName: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          bankName: response.data.bankName || ''
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    try {
      await axios.put('http://localhost:3000/api/auth/update-profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-desktop-container">
      <div className="profile-desktop-header">
        <div className="header-content">
          <h1><FaUser className="header-icon" /> User Profile</h1>
          <p className="header-subtitle">View and manage your personal information</p>
        </div>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Dashboard
        </button>
      </div>

      <div className="profile-desktop-content">
        <div className="profile-desktop-card">
          {isEditing ? (
            <div className="edit-profile-form">
              <h2 className="form-title">Edit Profile</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label><FaUser className="input-icon" /> Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label><FaEnvelope className="input-icon" /> Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled
                    className="disabled-input"
                  />
                </div>
                <div className="form-group">
                  <label><FaPhone className="input-icon" /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="form-group">
                  <label><FaLandmark className="input-icon" /> Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={userData.bankName}
                    onChange={handleInputChange}
                    placeholder="State Bank of India"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button onClick={() => setIsEditing(false)} className="cancel-button">
                  Discard Changes
                </button>
                <button onClick={handleSave} className="save-button">
                  <FaSave /> Save Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="view-profile">
              <div className="profile-header-section">
                <h2>Personal Information</h2>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="edit-profile-button"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
              
              <div className="profile-details-grid">
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaUser className="detail-icon" />
                    <span>Full Name</span>
                  </div>
                  <div className="detail-value">{userData.name || 'Not provided'}</div>
                </div>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaEnvelope className="detail-icon" />
                    <span>Email Address</span>
                  </div>
                  <div className="detail-value">{userData.email}</div>
                </div>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaPhone className="detail-icon" />
                    <span>Phone Number</span>
                  </div>
                  <div className="detail-value">{userData.phone || 'Not provided'}</div>
                </div>
                
                <div className="profile-detail">
                  <div className="detail-label">
                    <FaLandmark className="detail-icon" />
                    <span>Bank Name</span>
                  </div>
                  <div className="detail-value">{userData.bankName || 'Not provided'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;