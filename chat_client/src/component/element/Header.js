import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../static/img/home.png'

const Header = () => {
    return (
        <div>
            <Link to='/'><img src={image} width="30px" height="30px" alt="home"></img></Link>
            
        </div>
    );
};

export default Header;