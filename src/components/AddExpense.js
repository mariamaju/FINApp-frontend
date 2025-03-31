import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveExpense = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('User not authenticated!');
            return;
        }

        if (!amount || !category) {
            alert('Amount and category are required!');
            return;
        }

        setIsLoading(true);

        try {
            // Only call the payments API (remove expenses API)
            const paymentResponse = await axios.post(
                'http://localhost:3000/api/payments',
                { amount, category },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Payment successful:', paymentResponse.data);
            alert('Expense recorded successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(`Failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-expense-container">
            <h2>Add New Expense</h2>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Dining">Dining</option>
                <option value="Shopping">Shopping</option>
            </select>
            <button 
                onClick={handleSaveExpense}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Save Expense'}
            </button>
        </div>
    );
};

export default AddExpense;