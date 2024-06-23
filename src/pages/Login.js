import React, { useState } from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken.js';
import Layout from '../components/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setToken } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5075/api/auth/login',
        { username, password }
      );
      console.log(response);
      setToken(response.data);
      window.location.replace('/');
    } catch (error) {
      console.error('Login failed', error);
      setError(true);
    }
  };

  return (
    <Layout>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <form className='p-4 border rounded bg-light' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputUsername' className='form-label'>
              שם משתמש
            </label>
            <input
              type='username'
              className='form-control'
              id='exampleInputUsername'
              aria-describedby='usernameHelp'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              סיסמא
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            התחבר
          </button>
          {error && (
            <div className='alert alert-danger mt-3' role='alert'>
              ! כניסה נכשלה אחד הנתונים שגויים{' '}
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
