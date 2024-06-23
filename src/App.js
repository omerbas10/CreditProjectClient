import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CardPage from './pages/CardPage';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import useToken from './hooks/useToken';

function App() {
  const { token } = useToken();

  if (!token) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cardPage/:cardNumber' element={<CardPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
