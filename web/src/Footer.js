import React from 'react'
import "./Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div>
        <h2>FWASH</h2>
        <p>The Fast Wash</p>
      </div>

      <div>
        <h3>Socials</h3>
        <Link to='/'>
          <InstagramIcon />
        </Link>
      </div>
    </div>
  )
}

export default Footer