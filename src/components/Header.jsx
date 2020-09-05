import React from "react";

const Header = ({ loggedIn, changeLoggedInUser, children }) => {
  return (
    <header className="header">
      <h1>NC News</h1>
      <h4>
        {loggedIn ? (
          <>
            {`Logged in as ${loggedIn}`}
            <button onClick={() => changeLoggedInUser(null)}>Log out</button>
          </>
        ) : (
          <>
            Log in to post a comment or vote
            <button onClick={() => changeLoggedInUser("jessjelly")}>
              Log in
            </button>
          </>
        )}
      </h4>
      {children}
    </header>
  );
};

export default Header;
