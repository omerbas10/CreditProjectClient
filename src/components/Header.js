import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Header = () => {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg custom-navbar'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo01'
            aria-controls='navbarTogglerDemo01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {!token ? (
                <li className='nav-item'>
                  <NavLink to='/login' className='nav-link'>
                    התחברות
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink
                      onClick={handleLogout}
                      to='/login'
                      className='nav-link'
                    >
                      התנתק
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/' className='nav-link '>
                      דף הבית
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <span className='navbar-text'>פרויקט אשראי</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
