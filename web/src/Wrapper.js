import { useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo({top:0, left:0, behavior: 'smooth'});
  }, [location.pathname]);
  return children
} 

export default Wrapper;