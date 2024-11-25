import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <span><Link to="/"> 친구리스트 </Link></span>
            <span><Link to="/"> 채팅리스트 </Link></span>
            <span> 안뇽 </span>
            <span> 뽀숑 </span>
        </div>
    );
};

export default Footer;