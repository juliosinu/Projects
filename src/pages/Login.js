import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disable: true,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  async submitForm(event) {
    event.preventDefault();
    const { history, changeEmail } = this.props;
    const { email } = this.state;
    changeEmail(email);
    history.push('/carteira');
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  validateEmail() {
    const { email } = this.state;
    if (email.includes('@') && email.includes('.com')) {
      return true;
    } return false;
  }

  validatePassword() {
    const { password } = this.state;
    const minLength = 6;
    if (password.length >= minLength - 1) {
      return true;
    } return false;
  }

  validateLogin() {
    if (this.validateEmail() && this.validatePassword()) {
      return this.setState({
        disable: false,
      });
    } return this.setState({
      disable: true,
    });
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.submitForm }
          disabled={ disable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  changeEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(loginUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
