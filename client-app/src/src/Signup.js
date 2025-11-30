import React, { useState } from 'react';

function Signup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [message, setMessage] = useState('');

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Match C# backend property names
    const payload = {
      email: form.email,
      passwordHash: form.password, // backend expects PasswordHash
      firstName: form.firstName,
      lastName: form.lastName,
    };

    try {
      const response = await fetch('http://localhost:5156/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse backend response
      const data = await response.json();
      setMessage(data.message || 'Error creating account.');
    } catch (error) {
      console.error(error);
      setMessage('Server error.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Signup;
