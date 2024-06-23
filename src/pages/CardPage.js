import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import useToken from '../hooks/useToken';

const CardPage = () => {
  const { cardNumber } = useParams();
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [requestedLimit, setRequestedLimit] = useState('');
  const [cardBlock, setCardBlock] = useState('');
  const [card, setCard] = useState([]);
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:5075/api/cards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cardNumber,
          },
        });
        setCard(response.data[0]);
        setCardBlock(response.data[0].isBlocked);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, [card, cardNumber, token]);

  useEffect(() => {
    const setNameOfBank = (banks) => {
      const bank = banks.find((bank) => bank.code === card.bankCode);
      if (bank) {
        setBankName(bank.name);
      }
    };

    if (banks.length > 0 && card) {
      setNameOfBank(banks);
    }
  }, [banks, card]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5075/api/cards/increase-limit`,
        {
          cardNumber,
          requestedLimit,
          occupation,
          monthlyIncome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage('! הבקשה אושרה בהצלחה מסגרת עודכנה בהתאם');
        setIsError(false);
      } else {
        setMessage('הבקשה נדחתה');
        setIsError(true);
      }

      setTimeout(() => {
        setShowAlert(true);
      }, 100);

      setTimeout(() => {
        setShowAlert(false);
        setTimeout(() => setMessage(''), 500);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className='row cardpage'>
        <div className='col md-6'>
          <h1>פרטי כרטיס</h1>
          <p>
            <b>מספר כרטיס : </b>
            {cardNumber}
          </p>
          <p>
            <b>בנק : </b>
            {bankName}
          </p>
          <p>
            <b>תאריך הנפקה : </b>
            {new Date(card.issueDate).toLocaleDateString('he-IL')}
          </p>
          <img src={card.image} className='card-img' alt='...' />
          <p>
            <b>מסגרת כרטיס : </b>₪{card.creditLimit}
          </p>
        </div>
        <form onSubmit={handleSubmit} className='col-md-3'>
          {cardBlock ? (
            <p style={{ color: 'red', fontSize: 'large' }}>
              כרטיס חסום לא ניתן לבקש הגדלה
            </p>
          ) : (
            <>
              <div>
                <h5 className='text-end'>הכנס נתונים ובדוק עבור הגדלת מסגרת</h5>
                <label htmlFor='monthlyIncome' className='form-label'>
                  הכנסה חודשית
                </label>
                <input
                  type='text'
                  className='form-control text-end small-input'
                  id='monthlyIncome'
                  maxLength={7}
                  placeholder='? הכנסה חודשית ממוצעת'
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='requestedLimit' className='form-label'>
                  מסגרת מבוקשת
                </label>
                <input
                  type='text'
                  className='form-control text-end small-input'
                  id='requestedLimit'
                  maxLength={6}
                  max={100000}
                  placeholder='הכנסה מסגרת מבוקשת'
                  onChange={(e) => setRequestedLimit(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='occupationSelect' className='form-label'>
                  בחר סטטוס תעסוקתי
                </label>
                <select
                  className='form-select text-end small-input'
                  id='occupationSelect'
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                >
                  <option value=''>בחר </option>
                  <option value='שכיר'>שכיר</option>
                  <option value='עצמאי'>עצמאי</option>
                  <option valie='אחר'>אחר</option>
                </select>
              </div>
              <button
                type='submit'
                className='btn btn-outline-primary'
                disabled={
                  monthlyIncome === '' ||
                  requestedLimit === '' ||
                  occupation === ''
                }
              >
                שלח לבדיקה
              </button>
            </>
          )}
        </form>
        {message && (
          <div
            className={`alert ${isError ? 'alert-danger' : 'alert-success'} ${
              showAlert ? 'show' : 'hide'
            }`}
            style={{ textAlign: 'center', width: '70%' }}
          >
            {message}
          </div>
        )}
      </div>
      <Link className='center-link' to={`/search/`}>
        <b> חזור לחיפוש כרטיסים</b>
      </Link>
    </Layout>
  );
};

export default CardPage;
