import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ result, maskCardNumber }) => {
  return (
    <div className='container card mb-3 mt-2' key={result.cardNumber}>
      <img src={result.image} className='card-img' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>
          <Link to={`/cardPage/${result.cardNumber}`} state={{ result }}>
            לחץ לפרטי כרטיס
          </Link>
        </h5>
        <p className='card-text'>
          מספר כרטיס: {maskCardNumber(result.cardNumber)}
        </p>
        <p className='card-text'>
          <small className='text-body-secondary'>
            מצב כרטיס : {result.isBlocked ? 'חסום' : 'פתוח'}
          </small>
        </p>
      </div>
    </div>
  );
};

export default Card;
