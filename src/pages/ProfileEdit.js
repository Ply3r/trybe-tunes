import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css'
import { FaCheck, FaTimes } from 'react-icons/fa';

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
    const regex = /(.*)@\w*[.][\w]{2,3}$/gm;
    let disabled = true;
    let emailCheck = email.match(regex);
    if (name && description && image && emailCheck) {
      disabled = false;
    }
    let hold = 'data:image/png;base64,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'
    if (image) {
      hold = image
    }
    return (
      <div className="page-profile-edit">
        <form>
          <div className="image-container">
            <img src={ hold } alt="user" />
            <input
              placeholder="Digite um link..."
              name="image"
              id="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
            />
            { image 
            ? <div className="check"><FaCheck /></div> 
            : <div className="times"><FaTimes /></div>}
          </div>
          
            <h2>Name:</h2>
            <div className="flex">
              <input
                name="name"
                id="edit-input-name"
                placeholder="digite seu nome..."
                value={ name }
                onChange={ this.handleChange }
              />
              { name 
              ? <div className="check"><FaCheck /></div> 
              : <div className="times"><FaTimes /></div>
              }
            </div>
          
          
            <h2>Email:</h2>
            <div className="flex">
              <input
                name="email"
                id="edit-input-email"
                placeholder="digite seu email..."
                value={ email }
                onChange={ this.handleChange }
              />
              { emailCheck
              ? <div className="check"><FaCheck /></div> 
              : <div className="times"><FaTimes /></div>
              }
            </div>
          <label htmlFor="edit-input-description">
            <h2>Description:</h2>
            <div className="flex">
            <textarea
              placeholder="digite uma descri????o..."
              name="description"
              id="edit-input-description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
            />
              { description
                ? <div className="check"><FaCheck /></div>
                : <div className="times"><FaTimes /></div>
              }
            </div>
          </label>     
          <button
            className="edit-button-save"
            disabled={ disabled }
            type="button"
            onClick={ this.onButtonClick }
          >
            Salvar
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
        { saved && <Redirect to="/trybe-tunes/profile" /> }
      </>
    );
  }
}

export default ProfileEdit;
