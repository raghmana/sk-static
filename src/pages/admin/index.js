import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../lib/auth';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Added this line
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        // Force a hard refresh to ensure cookies are properly set
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className={styles.adminLogin}>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className={styles.loginContainer}>
        <h1>Admin Login</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoggingIn}
            />
          </div>
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}