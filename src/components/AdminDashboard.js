import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaTrophy, FaUsers, FaMoneyBillWave, FaChartLine, FaCog, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [transactions, setTransactions] = useState([]); // Added state for transactions
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [usersPage, setUsersPage] = useState(1);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  

  

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

   // State for counters fetched from API
   const [counters, setCounters] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    totalExpenses: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  // State for users
  


  // Fetch counters from API
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/counters');
        setCounters(response.data);
      } catch (error) {
        console.error('Error fetching counters:', error);
      }
    };

    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/recent-transactions');
        setRecentTransactions(response.data);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/users?page=${usersPage}&limit=${itemsPerPage}`);
        setUsers(response.data.users);
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchRecentTransactions();
    fetchCounters();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/admin/users', {
          page: usersPage,
          limit: itemsPerPage
        });
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [usersPage]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/transactions', {
          params: {
            page: transactionsPage,
            limit: itemsPerPage,
            category: selectedCategory, // Optional: category filter
            search: searchQuery // Optional: search query
          }
        });
        setTransactions(response.data.transactions);
        setTotalTransactions(response.data.total);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [transactionsPage, selectedCategory, searchQuery]);

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
                <p>{counters.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p>{counters.activeUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Transactions</h3>
                <p>{counters.totalTransactions}</p>
              </div>
              <div className="stat-card">
                <h3>Total Expenses</h3>
                <p>₹{counters.totalExpenses.toLocaleString()}</p>  {/* Changed $ to ₹ */}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-transactions">
              <h2>Recent Transactions</h2>
              <div className="transactions-grid">
              {recentTransactions.map(tx => (
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
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.joinDate)}</td>
                    <td>
                      <span className={`status-badge ${user.status ? 'active' : 'inactive'}`}>
                        {user.status ? 'Active' : 'Inactive'}
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
              <span>Page {usersPage} of {Math.ceil(totalUsers / itemsPerPage)}</span>
              <button 
                onClick={() => handleUsersPageChange(usersPage + 1)} 
                disabled={usersPage === Math.ceil(totalUsers / itemsPerPage)}
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
                <select 
                  className="filter-select" 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Dining">Dining</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <table className="transactions-table">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>User</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    {/* <td>{tx.id}</td> */}
                    <td>{tx.user_id.firstName}</td>
                    <td>₹{tx.amount}</td>
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
              <span>Page {transactionsPage} of {Math.ceil(totalTransactions / itemsPerPage)}</span>
              <button 
                onClick={() => handleTransactionsPageChange(transactionsPage + 1)} 
                disabled={transactionsPage === Math.ceil(totalTransactions / itemsPerPage)}
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