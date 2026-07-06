// Write your code here
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import PasswordItem from "../PasswordItem";
import "./index.css";

const PasswordManager = () => {
  const [websiteInput, setWebsiteInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordsList, setPasswordsList] = useState(() => {
    const savedPasswords = localStorage.getItem("passwords");

    if (savedPasswords) {
      return JSON.parse(savedPasswords);
    }

    return [];
  });
  const [searchInput, setSearchInput] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwordsList));
  }, [passwordsList]);

  const onChangeWebsite = (event) => setWebsiteInput(event.target.value);
  const onChangeUsername = (event) => setUsernameInput(event.target.value);
  const onChangePassword = (event) => setPasswordInput(event.target.value);
  const onChangeSearch = (event) => setSearchInput(event.target.value);
  const onToggleShowPasswords = () =>
    setShowPasswords((prevState) => !prevState);

  const onAddPassword = (event) => {
    event.preventDefault();
    if (websiteInput && usernameInput && passwordInput) {
      const newPasswordItem = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      };
      setPasswordsList((prevList) => [...prevList, newPasswordItem]);
      setWebsiteInput("");
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  const onDeletePassword = (id) => {
    const filteredList = passwordsList.filter((item) => item.id !== id);
    setPasswordsList(filteredList);
  };

  const filteredPasswords = passwordsList.filter((item) =>
    item.website.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const passwordsCount = filteredPasswords.length;

  return (
    <div className="password-manager-container">
      <div className="top-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-password-section">
          <form onSubmit={onAddPassword} className="form">
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={onChangePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="manager-image"
          />
        </div>
      </div>

      <div className="passwords-section">
        <div className="passwords-header">
          <div className="passwords-count-container">
            <h1 className="passwords-heading">Your Passwords</h1>
            <p className="passwords-count">{passwordsCount}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={onChangeSearch}
            />
          </div>
        </div>
        <hr />
        <div className="show-password-container">
          <input
            type="checkbox"
            id="showPasswords"
            checked={showPasswords}
            onChange={onToggleShowPasswords}
          />
          <label htmlFor="showPasswords">Show Passwords</label>
        </div>

        {passwordsCount === 0 ? (
          <div className="no-passwords-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-passwords-image"
            />
            <p className="no-passwords-text">No Passwords</p>
          </div>
        ) : (
          <ul className="passwords-list">
            {filteredPasswords.map((item) => (
              <PasswordItem
                key={item.id}
                passwordDetails={item}
                showPassword={showPasswords}
                deletePassword={onDeletePassword}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PasswordManager;
