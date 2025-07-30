import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Header.css';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" className="app-logo-link">
                    <Logo />
                </Link>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">목록</Link></li>
                        <li><Link to="/write">글 작성</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;