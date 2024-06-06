import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';

interface LoginPageProps {
  onLogin: () => void;
}

  export const LoginPage: React.FC<LoginPageProps> = ({onLogin}) => { 

  return (
    <div>
      <h1>Login</h1>
      <LoginForm login={onLogin}/>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

