import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout>
      <div
        className='container text-center'
        style={{
          backgroundImage: "url('/images/back.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '65vh',
        }}
      >
        <h1>! הגעתם לפרויקט שלי</h1>
        <div> כאן תוכלו לחפש כרטיסים ולבדוק בנוגע להגדלת מסגרת</div>
        <div> למעבר לחיפוש כרטיס לחצו </div>
        <Link className='center-link' to={`/search/`}>
          <b>חיפוש כרטיסים</b>
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
