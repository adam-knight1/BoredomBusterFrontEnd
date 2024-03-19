import React, { useState } from 'react';
import dynamic from 'next/dynamic';
//import Chessboard from 'chessboardjsx';

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false });


const ChessGame: React.FC = () => {
  const [position, setPosition] = useState('start');
  const [fen, setFen] = useState('start');

  const handleMove = async (sourceSquare: string, targetSquare: string) => {
    const move = `${sourceSquare}-${targetSquare}`;

    // Construct the API endpoint
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiUrl = `${backendBaseUrl}/api/chess/move`;

    // Send the move to the backend and wait for the response
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `playerMove=${move}`
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the backend returns the new FEN string after the move
      const newFen = await response.text();
      setFen(newFen); // Update the local FEN state
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <Chessboard
      width={320}
      position={fen}
      onDrop={({ sourceSquare, targetSquare }) => {
        handleMove(sourceSquare, targetSquare);
      }}
    />
  );
};

export default ChessGame;
