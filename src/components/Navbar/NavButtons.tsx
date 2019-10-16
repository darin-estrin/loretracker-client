import React from 'react';
import { Link } from 'react-router-dom';


interface INavButtonsProps {
  authorized: boolean;
}

const NavButtons: React.FunctionComponent<INavButtonsProps> = ({ authorized }):JSX.Element => {

  const renderButtons = (authorized:boolean):JSX.Element => {
    if (authorized) {
      return (
        <Link to="/register" className="button is-danger">
          <strong>Log Out</strong>
        </Link>
      );
    } else {
      return (
        <React.Fragment>
          <Link to='/login' className="button is-light">
            <strong>Log In</strong>
          </Link>
          <Link to="/register" className="button is-danger">
            <strong>Sign Up</strong>
          </Link>
        </React.Fragment>
      );
    }
  }

  return (
    <div id='navbar-menu' className="navbar-menu">
      <div className="navbar-start">
        <Link className='navbar-item' to='/'>Home</Link>
        <Link className='navbar-item' to='/'>FAQ</Link>
      </div>

      <div className='navbar-end'>
        <div className="navbar-item">
          <div className="buttons">
            {renderButtons(authorized)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavButtons;
