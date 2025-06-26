import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__logo">🎬 CineNova</div>
            <img
                className="navbar__avatar"
                src="https://i.pravatar.cc/300?img=12"
                alt="User Avatar"
            />
        </header>
    );
}

export default Navbar;

