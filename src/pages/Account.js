import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import './Account.css';

function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="account-container">
      {user ? (
        <div>
          <h1>Account Details</h1>
          <p>Email: {user.email}</p>
          <p>User ID: {user.uid}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please log in to view account details.</p>
      )}
    </div>
  );
}

export default AccountPage;
