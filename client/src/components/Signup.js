import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/signup', formData);
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert('Error during signup');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
