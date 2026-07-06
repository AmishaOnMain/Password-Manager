
import "./index.css";

const PasswordItem = (props) => {
  const { passwordDetails, showPassword, deletePassword } = props;
  const { id, website, username, password } = passwordDetails;

  const onClickDelete = () => {
    deletePassword(id);
  };

  const passwordDisplay = showPassword ? (
    <p className="password-text">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-image"
    />
  );

  return (
    <li className="password-item">
      <p className="website-text">{website}</p>
      <p className="username-text">{username}</p>
      {passwordDisplay}
      <button
        type="button"
        data-testid="delete"
        onClick={onClickDelete}
        className="delete-button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  );
};

export default PasswordItem;
