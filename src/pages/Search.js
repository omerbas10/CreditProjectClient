import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Search = () => {
  const [results, setResults] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [banks, setBanks] = useState([]);
  const [isBlocked, setIsBlocked] = useState('');
  const [firstSearch, setFirstSearch] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`http://localhost:5075/api/banks`);
        setBanks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstSearch(true);
    try {
      const response = await axios.get(`http://localhost:5075/api/cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          cardNumber,
          bankCode,
          isBlocked,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const maskCardNumber = (number) => {
    return number.slice(-4) + '********' + number.slice(0, 4);
  };

  return (
    <Layout>
      <div className='container mt-4 d-flex'>
        <div className='w-75 ms-auto' style={{ marginLeft: '25%' }}>
          {results.length > 0 ? (
            <ul style={{ overflowY: 'scroll', height: '60vh' }}>
              <h2 style={{ textAlign: 'center' }}>: תוצאות חיפוש</h2>
              {results.map((result) => (
                <Card
                  key={result.cardNumber}
                  result={result}
                  maskCardNumber={maskCardNumber}
                />
              ))}
            </ul>
          ) : (
            firstSearch && (
              <p
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  height: '50vh',
                }}
              >
                לא נמצאו כרטיסים תואמים
              </p>
            )
          )}
        </div>
        <div className='w-25'>
          <h5 className='text-end'>הכנס נתונים לחיפוש כרטיס</h5>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='cardNumber' className='form-label'>
                מספר כרטיס אשראי
              </label>
              <input
                type='text'
                className='form-control text-end small-input'
                id='cardNumber'
                maxLength={16}
                placeholder='הכנס 16 ספרות'
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='bankSelect' className='form-label'>
                בחר בנק
              </label>
              <select
                className='form-select text-end small-input'
                id='bankSelect'
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
              >
                <option value=''>בחר בנק</option>
                {banks.map((bank) => {
                  return (
                    <option key={bank.name} value={bank.code}>
                      {bank.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>מצב כרטיס</label>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='cardStatus'
                  id='blocked'
                  value='true'
                  checked={isBlocked === 'true'}
                  onChange={(e) => setIsBlocked(e.target.value)}
                />
                <label className='form-check-label' htmlFor='blocked'>
                  חסום
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='cardStatus'
                  id='notBlocked'
                  value='false'
                  checked={isBlocked === 'false'}
                  onChange={(e) => setIsBlocked(e.target.value)}
                />
                <label className='form-check-label' htmlFor='notBlocked'>
                  פתוח
                </label>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <button
                type='submit'
                className='btn btn-outline-primary'
                disabled={
                  cardNumber === '' && bankCode === '' && isBlocked === ''
                }
              >
                חפש
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link className='center-link' to={`/`}>
        <b> חזור לדף הבית</b>
      </Link>
    </Layout>
  );
};

export default Search;
