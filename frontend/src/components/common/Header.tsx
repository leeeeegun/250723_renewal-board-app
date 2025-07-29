import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Header.css';

const Header: React.FC = () => {
    return (
        <header className="aoo-header">
            <div className="header-container">
                <Link to="/" className="app-logo">익명 게시판</Link>
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