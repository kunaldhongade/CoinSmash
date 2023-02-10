import React from 'react';
import logo from '../assets/CoinSmash.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Link to='/'>
      <div className="navbar">
        <img src={logo} alt='logo' className='icon' />
        <h1> Coin <span className='purple'>Smash</span></h1>
      </div>
    </Link >
  )
}

export default Navbar;
