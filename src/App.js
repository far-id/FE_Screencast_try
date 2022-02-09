import axios from 'axios';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Router from './Router';
import { authenticatedUser, cartsStore } from './store';

export default function App() {
  const [mounted, setMounted] = React.useState(false);
  const setAuth = useSetRecoilState(authenticatedUser);
  const setCarts = useSetRecoilState(cartsStore);
  useEffect(() => {
    const getUser = async () => {
      try {
        let { data } = await axios.get('/api/me');
        setAuth({
          user: data.data,
          isAuthenticated: true,
        });
        setMounted(true);
      } catch (error) {
        console.log(error);
        setMounted(true);
      }
    }

    const getCarts = async () => {
      try {
        let { data } = await axios.get('/api/carts');
        setCarts(data.data)
      } catch (error) {
        console.log(error);
      }
    }

    getCarts();
    getUser();
  }, [setAuth, setCarts]);

  if (!mounted) {
    return (
      <div className='flex items-center justify-center min-h-screen '>
        <div>
          <h3 className='text-2xl font-semibold text-center'>
            Loading . . .
          </h3>
          <p className='font-light'>
            This page can take a while to load.
          </p>
        </div>
      </div>
    )
  }
  return <Router />

}