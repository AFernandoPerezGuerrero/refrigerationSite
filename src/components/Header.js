import React from "react";
import '../styles/Header.css'
import { IoIosMenu } from "react-icons/io";

function Header({ onOpenMenu }) {
    
    return (
    
        <div className='header'>
            <button className="menu-button" onClick={onOpenMenu} aria-label="Abrir menú">
            <IoIosMenu />
            </button>

            <a href="#" className='title'>
        <h2 className='coolfix'>COOLFIX</h2>
        <h2>Hogar e Industria</h2>
            </a>

            <div className='language-buttons'>
                <a className='spanish-button'>ES</a>
                <a className='english-button'>EN</a>
            </div>
        </div>
            
    )
}

export default Header;