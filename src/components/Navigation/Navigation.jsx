import React from "react";

const Navigation = ({ handleRouteChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 b link dim black underline pa3 pointer"
        onClick={()=>handleRouteChange('signin')}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;