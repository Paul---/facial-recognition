import React from "react";


const Score = ({ playerScore }) => {
  return (
    <div>
      <div className="white f3 b">{`Current Score ${playerScore || 0}`}</div>
    </div>
  );
};

export default Score;
