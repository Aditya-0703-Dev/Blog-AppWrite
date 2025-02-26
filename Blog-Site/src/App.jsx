import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import authService from './appwrite/auth';
import {login, logout} from './features/authSlice';
import {Header, Footer} from './components/componentsIndex';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.GetCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(logout());
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      null
    )
  } else {
    return (
      <div className='min-h-screen flex flex-col bg-slate-100'>
        <Header />
          <main className='flex-grow shadow-inner'>
            <Outlet />
          </main>
          <Footer />
      </div>
    )
  }
}

export default App
