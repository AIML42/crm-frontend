import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/authSlice';

function AuthInitializer() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // If we have a token but no user, fetch the user data
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);
  
  // This component doesn't render anything
  return null;
}

export default AuthInitializer;