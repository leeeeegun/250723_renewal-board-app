import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import BoardEdit from './pages/BoardEdit';
import './assets/styles/App.css'; // 전역 스타일 파일

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<BoardList />} />
                        <Route path="/write" element={<BoardWrite />} />
                        <Route path="/board/:id" element={<BoardDetail />} />
                        <Route path="/edit/:id" element={<BoardEdit />} />
                        {/* 404 페이지 등 추가 가능 */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;