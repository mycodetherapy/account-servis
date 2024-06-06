import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};
