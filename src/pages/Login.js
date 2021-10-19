import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      buttonDisable: true,
      loading: false,
      auth: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.isButtonDisable();
    });
  }

  isButtonDisable = () => {
    const { name } = this.state;
    const maxLength = 3;
    if (name.length >= maxLength) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  onButtonClick = async () => {
    this.setState({ loading: true });
    await createUser(this.state);
    this.setState({ loading: false, auth: true });
  }

  loginPage() {
    const { buttonDisable } = this.state;
    return (
      <div className="page-login" data-testid="page-login">
        <div className="background-login"/>
        <div className="login">
          <h1>Login</h1>
          <input
            placeholder="Digite seu nome..."
            onChange={ this.handleChange }
            name="name"
            data-testid="login-name-input"
          />
          <button
            onClick={ this.onButtonClick }
            disabled={ buttonDisable }
            data-testid="login-submit-button"
            type="button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { loading, auth } = this.state;
    return (
      <div>
        { loading ? <Loading /> : this.loginPage() }
        { auth && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
