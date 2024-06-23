import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout>
      <div className='container text-center'>
        <h1>שגיאה</h1>
        <h2>! דף לא נמצא</h2>
        <div> למעבר לחיפוש כרטיס לחצו </div>
        <Link className='center-link' to={`/search/`}>
          <b> חיפוש כרטיסים</b>
        </Link>
        <div></div>
        <div> למעבר לדף הבית לחצו </div>
        <Link className='center-link' to={`/`}>
          <b> דף הבית</b>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
