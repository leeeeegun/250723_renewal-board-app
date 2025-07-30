import React from 'react';

// "익명 게시판" 로고 SVG 컴포넌트
const Logo: React.FC = () => {
    return (
        <svg
            width="180"
            height="70"
            viewBox="0 0 180 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 메인 구름 형태 */}
            <path
                d="M150 35C150 49.3594 138.359 61 124 61C119.066 61 114.398 59.5026 110.395 56.8839C107.411 59.7891 103.208 61 99 61C88.4924 61 79.9142 52.3333 79.9142 41.5C79.9142 36.4673 81.8213 31.6667 85.166 28.1408C81.8213 24.615 79.9142 19.8143 79.9142 14.7816C79.9142 4.09015 88.4924 -4.5 99 -4.5C106.128 -4.5 112.441 -1.41667 116.828 3.01186C121.725 -1.41667 127.872 -4.5 134.5 -4.5C147.228 -4.5 157.914 5.92797 157.914 18.5C157.914 26.5 154.5 35 150 35Z"
                fill="#87CEEB"
                transform="scale(0.9) translate(10, 5)"
            />
            {/* 작은 구름들 */}
            <circle cx="30" cy="40" r="15" fill="#87CEFA" transform="scale(0.9) translate(10, 5)" />
            <circle cx="160" cy="20" r="10" fill="#00BFFF" transform="scale(0.9) translate(10, 5)" />

            {/* "익명 게시판" 텍스트 */}
            <text
                x="90"
                y="38"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Jua, cursive" // App.css에서 설정한 폰트 사용
                fontSize="22"
                fill="#FF4500" // 텍스트 색상 (secondary-color와 유사)
                fontWeight="1000"
            >
                <tspan x="90" dy="-16">떠드는</tspan>
                <tspan x="90" dy="24">커뮤니티</tspan>
            </text>
        </svg>
    );
};

export default Logo;