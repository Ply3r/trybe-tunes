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
            <div className="image-container">
              <img data-testid="profile-image" src={ image } alt={ name } />
              <Link to="/profile/edit">
                <button type="button" className="link">Editar perfil</button>
              </Link>
            </div>
            <h2>Name:</h2>
            <h3>{ name }</h3>
            <h2>Email:</h2>
            <h3>{ email }</h3>
            <h2>Description: </h2>
            <p>{ description }</p>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
