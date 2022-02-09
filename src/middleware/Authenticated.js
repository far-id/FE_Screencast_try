import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticatedUser } from '../store';

function Authenticated(props) {
  const auth = useRecoilValue(authenticatedUser);
  const history = useNavigate();
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      history('/login');
    }
  }, [auth, history]);
  return props.render
}

export default Authenticated;