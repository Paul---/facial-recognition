import React from "react";

const Navigation = ({ handleRouteChange, isSignedIn }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      {isSignedIn ? (
        <>
          {isSignedIn ? (
            <p
              className="f3 b link dim black underline pa3 pointer"
              onClick={() => handleRouteChange("signin")}
            >
              Sign Out
            </p>
          ) : null}
        </>
      ) : null}
    </nav>
  );
};

export default Navigation;
