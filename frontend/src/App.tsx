import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Confetti from 'react-confetti';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import BoardEdit from './pages/BoardEdit';

import './assets/styles/App.css';
import './assets/styles/Global.css';

function App() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight }); // ✅ 윈도우 크기 상태

    // 윈도우 크기 변경 감지 (꽃가루가 화면 전체에 퍼지도록)
    const detectSize = () => {
        setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize);
        };
    }, []);

    useEffect(() => {
        setShowConfetti(true);
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000); // 10초 후에 꽃가루 멈춤

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []); // 빈 배열은 컴포넌트 마운트 시 한 번만 실행됨

    return (
        <Router>
            <div className="app-container">
                {showConfetti && (
                    <Confetti
                        width={windowDimension.width}
                        height={windowDimension.height}
                        numberOfPieces={100} // 꽃가루 개수 (조절 가능)
                        recycle={true} // 한 번 뿌리고 사라지게 할지 (true면 계속 뿌림)
                        tweenDuration={5000} // 꽃가루가 떨어지는 시간 (ms)
                        gravity={0.1} // 중력 (숫자가 클수록 빨리 떨어짐)
                        initialVelocityX={{ min: -10, max: 10 }} // 초기 X축 속도
                        initialVelocityY={{ min: 10, max: 20 }} // 초기 Y축 속도
                        colors={['#FFD700', '#FF69B4', '#ADFF2F', '#00BFFF', '#FF4500']} // 꽃가루 색상 (원하는 색상으로 변경 가능)
                    />
                )}
                <Header />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<BoardList />} />
                        <Route path="/board/:id" element={<BoardDetail />} />
                        <Route path="/write" element={<BoardWrite />} />
                        <Route path="/edit/:id" element={<BoardEdit />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;