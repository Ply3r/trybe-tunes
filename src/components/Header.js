import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "../images/logo.png"
import '../css/header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }
  

  getUserName = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ loading: false, name });
  }

  headerContent = () => {
    const { name } = this.state;
    const { active } = this.props;
    return (
      <header data-testid="header-component">
        <div className="first-header">
          <img src={ logo } alt="logo" />
          <div className="header-user">
            <div className="user-icon"><FontAwesomeIcon icon={ faUser } /></div>
            <h1 className="header-user-name">{ name }</h1>
          </div>
        </div>
        <nav className="links-header">
          <Link data-testid="link-to-search" to="/search"><div className={ active === 'Search' && 'active'}>Search</div></Link>
          <Link data-testid="link-to-favorites" to="/favorites"><div className={ active === 'Favorites' && 'active'}>Favorites</div></Link>
          <Link data-testid="link-to-profile" to="/profile"><div className={ active === 'Profile' && 'active'}>Profile</div></Link>
        </nav>
      </header>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : this.headerContent() }
      </div>
    );
  }
}

export default Header;
