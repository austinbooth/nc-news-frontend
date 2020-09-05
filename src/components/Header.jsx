import React from "react";

const Header = ({ loggedIn, changeLoggedInUser, children }) => {
  return (
    <header className="header">
      <h1>NC News</h1>
      <p>
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
      </p>
      {children}
    </header>
  );
};

export default Header;
