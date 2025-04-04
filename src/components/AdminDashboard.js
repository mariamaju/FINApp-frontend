import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaTrophy, FaUsers, FaMoneyBillWave, FaChartLine, FaCog, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  
  // Pagination states
  const [usersPage, setUsersPage] = useState(1);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Mock data
  const users = [
    { id: '1', name: 'Sherin Siby', email: 'ss@gmail.com', joinDate: '2023-01-15', isActive: true },
    { id: '2', name: 'Mika jose', email: 'mj@gmail.com', joinDate: '2023-02-20', isActive: true },
    { id: '3', name: 'Annu Mathew', email: 'am@gmail.com', joinDate: '2023-03-10', isActive: false },
    { id: '4', name: 'Minnu Mathew', email: 'mm@gmail.com', joinDate: '2023-04-05', isActive: true },
    { id: '5', name: 'Elsy Thomas', email: 'et@gmail.com', joinDate: '2023-05-12', isActive: false },
    { id: '6', name: 'Adam Jack', email: 'ad@gmail.com', joinDate: '2023-06-18', isActive: true }
  ];

  const transactions = [
    { id: 't1', userId: '1', amount: 1500, category: 'Shopping', date: '2023-06-15' },
    { id: 't2', userId: '2', amount: 2500, category: 'Food', date: '2023-06-14' },
    { id: 't3', userId: '1', amount: 3500, category: 'Travel', date: '2023-06-13' },
    { id: 't4', userId: '3', amount: 1200, category: 'Entertainment', date: '2023-06-12' },
    { id: 't5', userId: '4', amount: 1800, category: 'Shopping', date: '2023-06-11' },
    { id: 't6', userId: '5', amount: 2200, category: 'Food', date: '2023-06-10' },
    { id: 't7', userId: '6', amount: 3100, category: 'Travel', date: '2023-06-09' }
  ];

  // Calculate paginated data
  const paginatedUsers = users.slice(
    (usersPage - 1) * itemsPerPage,
    usersPage * itemsPerPage
  );

  const paginatedTransactions = transactions.slice(
    (transactionsPage - 1) * itemsPerPage,
    transactionsPage * itemsPerPage
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalTransactions: transactions.length,
    totalExpenses: transactions.reduce((sum, tx) => sum + tx.amount, 0)
  };

  const handleLogout = () => {
    // Clear any admin authentication state here if needed
    // Then navigate to login page
    navigate('/login', { replace: true }); // Added replace: true to prevent going back
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination handlers
  const handleUsersPageChange = (newPage) => {
    setUsersPage(newPage);
  };

  const handleTransactionsPageChange = (newPage) => {
    setTransactionsPage(newPage);
  };

  return (
    <div className={`admin-dashboard ${theme}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2><FaTrophy /> Admin Panel</h2>
        <nav>
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <FaChartLine /> Dashboard
            </li>
            <li 
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              <FaUsers /> User Management
            </li>
            <li 
              className={activeTab === 'transactions' ? 'active' : ''}
              onClick={() => setActiveTab('transactions')}
            >
              <FaMoneyBillWave /> Transactions
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </li>
            <li className="logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-view">
            <h1>Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p>{stats.activeUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Transactions</h3>
                <p>{stats.totalTransactions}</p>
              </div>
              <div className="stat-card">
                <h3>Total Expenses</h3>
                <p>₹{stats.totalExpenses.toLocaleString()}</p>  {/* Changed $ to ₹ */}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-transactions">
              <h2>Recent Transactions</h2>
              <div className="transactions-grid">
                {transactions.slice(0, 4).map(tx => (
                  <div key={tx.id} className="transaction-card">
                    <div className="transaction-category">{tx.category}</div>
                    <div className="transaction-amount">₹{tx.amount}</div>  
                    <div className="transaction-date">{formatDate(tx.date)}</div>
                    <div className="transaction-user">User {tx.userId}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-view">
            <div className="section-header">
              <h1>User Management</h1>
            </div>
            
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.joinDate)}</td>
                    <td>
                      <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      <button className="action-btn edit-btn">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for Users */}
            <div className="pagination">
              <button 
                onClick={() => handleUsersPageChange(usersPage - 1)} 
                disabled={usersPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span>Page {usersPage} of {Math.ceil(users.length / itemsPerPage)}</span>
              <button 
                onClick={() => handleUsersPageChange(usersPage + 1)} 
                disabled={usersPage === Math.ceil(users.length / itemsPerPage)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-view">
            <div className="section-header">
              <h1>Transaction History</h1>
              <div className="filters">
                <select className="filter-select">
                  <option>All Categories</option>
                  <option>Shopping</option>
                  <option>Grocery</option>
                  <option>Dining</option>
                  <option>Entertainment</option>
                </select>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search transactions..."
                />
              </div>
            </div>
            
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>User {tx.userId}</td>
                    <td>₹{tx.amount}</td>  {/* Changed $ to ₹ */}
                    <td>{tx.category}</td>
                    <td>{formatDate(tx.date)}</td>
                    <td>
                      <button className="action-btn view-btn">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for Transactions */}
            <div className="pagination">
              <button 
                onClick={() => handleTransactionsPageChange(transactionsPage - 1)} 
                disabled={transactionsPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span>Page {transactionsPage} of {Math.ceil(transactions.length / itemsPerPage)}</span>
              <button 
                onClick={() => handleTransactionsPageChange(transactionsPage + 1)} 
                disabled={transactionsPage === Math.ceil(transactions.length / itemsPerPage)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-view">
            <h1>System Settings</h1>
            
            <div className="settings-form">
              <div className="form-section">
                <h2>Appearance</h2>
                <div className="form-group">
                  <label>Theme</label>
                  <select 
                    value={theme} 
                    onChange={handleThemeChange}
                    className="theme-select"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn">Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;