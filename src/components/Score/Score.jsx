import React from "react";


const Score = ({score}) => {
  return (
    <div>
      <div className="white f3 b">{`Current Score ${score}`}</div>
    </div>
  );
};

export default Score;
