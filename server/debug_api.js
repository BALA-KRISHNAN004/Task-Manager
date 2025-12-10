const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    console.log('1. Registering User...');
    const regRes = await axios.post(`${API_URL}/auth/register`, {
      username: 'apiTestUser',
      email: 'apitest@example.com',
      password: 'password123'
    });
    console.log('Registration Success. Token:', regRes.data.token);
    const token = regRes.data.token;

    console.log('2. Verifying Token (Get User)...');
    const meRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Get User Success:', meRes.data);

    console.log('3. Logging In...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'apitest@example.com',
      password: 'password123'
    });
    console.log('Login Success. Token:', loginRes.data.token);
    
  } catch (err) {
    console.error('API Test Failed:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

testAuth();
