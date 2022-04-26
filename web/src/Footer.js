import React from 'react'
import "./Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__description'>
        <h2>FWASH</h2>
        <p>The Fastest Wash</p>
      </div>

      <div className='footer__socials'>
        <h3>Socials</h3>
        <Link to='/'>
          <FacebookIcon />
        </Link>
        <Link to='/'>
          <InstagramIcon />
        </Link>
        <Link to='/'>
          <TwitterIcon />
        </Link>
      </div>
    </div>
  )
}

export default Footer