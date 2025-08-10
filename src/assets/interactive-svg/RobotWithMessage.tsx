import React from 'react';

interface Robot404Props {
  message?: string; // Текст в диалоговом окне
  width?: number | string;
  height?: number | string;
}

const RobotWithMessage: React.FC<Robot404Props> = ({
  message = '404',
  width = 240,
  height = 240,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
        .robot-line {
          stroke: #555;
          stroke-width: 3;
          fill: none;
        }

        .robot-fill {
          fill: #ddd;
          stroke: #555;
          stroke-width: 3;
        }

        .bubble {
          fill: white;
          stroke: #555;
          stroke-width: 3;
        }

        .bubble-text {
          font-size: 20px;
          font-family: 'Segoe UI', sans-serif;
          fill: #333;
          font-weight: bold;
        }
      `}
      </style>

      {/* Голова */}
      <rect x="70" y="40" width="100" height="60" rx="10" className="robot-fill" />
      <circle cx="90" cy="70" r="5" fill="#555" />
      <circle cx="130" cy="70" r="5" fill="#555" />
      <line x1="100" y1="95" x2="120" y2="95" className="robot-line" />

      {/* Антенна */}
      <line x1="120" y1="40" x2="120" y2="25" className="robot-line" />
      <circle cx="120" cy="20" r="4" fill="#555" />

      {/* Тело */}
      <rect x="80" y="100" width="80" height="60" rx="10" className="robot-fill" />
      <line x1="80" y1="120" x2="60" y2="150" className="robot-line" />
      <line x1="160" y1="120" x2="180" y2="150" className="robot-line" />
      <rect x="100" y="170" width="10" height="20" fill="#555" />
      <rect x="130" y="170" width="10" height="20" fill="#555" />

      {/* Диалоговое окно */}
      <rect x="150" y="30" width="60" height="40" rx="6" className="bubble" />
      <polygon points="150,50 140,45 150,40" fill="white" stroke="#555" strokeWidth={3} />
      <text x="180" y="57" textAnchor="middle" className="bubble-text">
        {message}
      </text>
    </svg>
  );
};

export default RobotWithMessage