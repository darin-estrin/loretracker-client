import React from 'react';
import { Link } from 'react-router-dom';

import NavButtons from './NavButtons';

interface Props {
  authorized:boolean;
  brand:string;
}

interface State {
  expanded: boolean
}

class Navbar extends React.Component<Props, State> {
  static defaultProps = {
    authorized: false
  }

  readonly state = {
    expanded: false
  }

  private toggleNavMenu = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.currentTarget;
    const navMenu = document.getElementById('navbar-menu');

    if (!this.state.expanded) {
      navMenu!.classList.add('is-active');
      target.classList.add('is-active');
      target.attributes[3].value='true';
    } else {
      navMenu!.classList.remove('is-active');
      target.classList.remove('is-active');
      target.attributes[3].value='false';
    }
    this.setState(prevState => ({ expanded: !prevState.expanded }));

  }

  public render():JSX.Element {
    return (
      <nav className='navbar is-primary is-fixed-top' role='navigation' aria-label='main navigation'>
        <div className="navbar-brand">
          <Link to="/" id='brand' className="navbar-item">{this.props.brand}</Link>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleNavMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <NavButtons authorized={this.props.authorized} />
      </nav>
    );
  }
}

export default Navbar;
