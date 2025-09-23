import React from "react";
import '../styles/Header.css'
import Menu from "./Menu.js"


function Header() {
    return (
        <div className='header'>
            <div className='language-buttons'>
                <a className='spanish-button'>ES</a>
                <a className='english-button'>EN</a>
            </div>

            <div className='title'>
        <h2 className='coolfix'>COOLFIX</h2>
        <h2>Hogar e Industria</h2>
            </div>

        <Menu />

        </div>
    )
}

export default Header;