import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../css/profile.css'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserInformations();
  }

  getUserInformations = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image });
  }

  render() {
    const { name, email, description, image } = this.state;
    return (
      <>
        <Header active="Profile"/>
        <div className="page-profile">
          <div className="form-informations">
            <img data-testid="profile-image" src={ image } alt={ name } />
            <h1>{ name }</h1>
            <h2>{ email }</h2>
            <p>{ description }</p>
          </div>
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      </>
    );
  }
}

export default Profile;
