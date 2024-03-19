import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Chess } from 'chess.js'

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false });

const ChessGame: React.FC = () => {
  const [game, setGame] = useState<ChessInstance>(new Chess());
  const [position, setPosition] = useState('start');

  const handleMove = async (sourceSquare, targetSquare) => {
    // Make the move on the front end first
    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });

      console.log(`Attempting move from ${sourceSquare} to ${targetSquare}`);

      // Ensure the source and target squares are different
      if (sourceSquare === targetSquare) {
        console.error("Invalid move: source and target squares are the same.");
        return;
      }



