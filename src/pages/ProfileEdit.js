import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
      saved: false,
    };
  }

  componentDidMount() {
    this.getUserInformation();
  }

  getUserInformation = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onButtonClick = async () => {
    const { name, email, description, image } = this.state;
    const obj = { name, email, description, image };
    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({ loading: false, saved: true });
  }

  form() {
    const { name, email, description, image } = this.state;
    const regex = /@(.*).(.{3})$/gm;
    let disabled = true;
    if (name && email && description && image && regex.test(email)) {
      disabled = false;
    }
    return (
      <div data-testid="page-profile-edit">
        <form>
          <label htmlFor="edit-input-name">
            Name:
            <input
              name="name"
              id="edit-input-name"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-input-email">
            Email:
            <input
              name="email"
              id="edit-input-email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-input-description">
            Description:
            <textarea
              name="description"
              id="edit-input-description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="edit-input-image">
            Image:
            <input
              name="image"
              id="edit-input-image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            disabled={ disabled }
            type="button"
            onClick={ this.onButtonClick }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { loading, saved } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : this.form() }
        { saved && <Redirect to="/profile" /> }
      </>
    );
  }
}

export default ProfileEdit;
