import React from "react";

const Header = ({ loggedIn, changeLoggedInUser }) => {
  return (
    <header className="header">
      <h1>NC News</h1>
      {/* <h4>{loggedIn && <>{`logged in as ${loggedIn}`}</>}</h4> */}
      {/* <button onClick={() => changeLoggedInUser(undefined)}>log out</button> */}
      <h4>
        {loggedIn ? (
          <>
            {`logged in as ${loggedIn}`}
            <button onClick={() => changeLoggedInUser(undefined)}>
              Log out
            </button>
          </>
        ) : (
          <button onClick={() => changeLoggedInUser("jessjelly")}>
            Log in
          </button>
        )}
      </h4>
    </header>
  );
};

export default Header;
