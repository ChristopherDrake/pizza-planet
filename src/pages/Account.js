import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Account.css';

function AccountPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardZipCode, setCardZipCode] = useState('');
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingCreditCard, setIsEditingCreditCard] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        const userRef = db.collection('users').doc(userAuth.uid);
        const fetchUserData = async() => {
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setAddress(userData.address || '');
            setCreditCard(userData.creditCard || '');
            if (userData.address) {
              const [street, city, state, zipCode] = userData.address.split(', ');
              setStreet(street);
              setCity(city);
              setState(state);
              setZipCode(zipCode);
            }
            if (userData.creditCard){
            const [cardNumber, cardholderName, securityCode, cardZipCode] =
              userData.creditCard.split(', ');
            setCardNumber(cardNumber);
            setCardholderName(cardholderName);
            setSecurityCode(securityCode);
            setCardZipCode(cardZipCode);
            }
          };
        };
        fetchUserData();
        const nameParts = userAuth.displayName.split(' ');
        setFirstName(nameParts[0]);
        setLastName(nameParts[1]);
      } else {
        setUser(null);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


  const updateUser = async (field, value) => {
    if (!user) return;
    const userRef = db.collection('users').doc(user.uid);

    if (field === 'displayName') {
      await user.updateProfile({ displayName: value.join(' ') });
      await userRef.update({ displayName: value.join(' ')})
    } else {
      const updatedValue = Array.isArray(value) ? value.join(', ') : value;
      await userRef.update({ [field]: updatedValue});
    }
  };

  const maskCreditCard = (cardNumber) => {
    if (typeof cardNumber === 'string') {
      return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
    } else {
      return '';
    }
  };

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
          <table className="account-details-table">
            <tbody>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr className="divider">
                <td colSpan="2"></td>
              </tr>
              <tr>
                <th>Name</th>
                {isEditingName ? (
                  <td>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <button onClick={() => {
                      updateUser('displayName', [firstName, lastName])
                      setIsEditingName(false)}}>
                      Save
                    </button>
                  </td>
                ) : (
                  <td>
                    {user.displayName}{' '}
                    <button onClick={() => setIsEditingName(true)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </td>
                )}
              </tr>
              <tr>
                <th>Address</th>
                {isEditingAddress ? (
                  <td>
                    <input type="text"
                    value = {street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street" />
                    <input type="text"
                    value = {city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City" />
                    <input type="text" 
                    value = {state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State" />
                    <input type="text" 
                    value = {zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Zip Code" />
                    <button onClick={() => {
                      const updatedAddress = [street, city, state, zipCode].join(', ')
                      updateUser('address', updatedAddress)
                      setAddress(updatedAddress)
                      setIsEditingAddress(false)}}>
                      Save
                    </button>
                  </td>
                ) : (
                  <td>
                    {address}{' '}
                    <button onClick={() => setIsEditingAddress(true)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </td>
                )}
              </tr>
              <tr>
                <th>Credit Card</th>
                {isEditingCreditCard ? (
                  <td>
                    <input type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number" />
                    <input type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Cardholder's Name" />
                    <input type="text" 
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="Security Code" />
                    <input type="text" 
                    value={cardZipCode}
                    onChange={(e) => setCardZipCode(e.target.value)}
                    placeholder="Zip Code" />
                    <button onClick={() => {
                      const updatedCreditCard = [cardNumber, cardholderName, securityCode, cardZipCode]
                      updateUser('creditCard', updatedCreditCard)
                      setCreditCard(updatedCreditCard)
                      setIsEditingCreditCard(false)}}>
                      Save
                    </button>
                  </td>
                ) : (
                  <td>
                    {maskCreditCard(creditCard)}{' '}
                    <button onClick={() => setIsEditingCreditCard(true)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please log in to view account details.</p>
      )}
    </div>
  );
}

export default AccountPage;