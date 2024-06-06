import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/people">Users</Link> | <Link to="/account">Edit Profile</Link>
      </nav>
    </header>
  );
};
