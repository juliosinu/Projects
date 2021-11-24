import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    this.validate();
  }

  handleClick(event) {
    event.preventDefault();
    const { history } = this.props;
    console.log(history);
    history.push('/carteira');
  }

  validate() {
    const { email, password } = this.state;
    const NUMERO_MINIMO = 5;
    console.log(email);
    //  https://stackoverflow.com/questions/41348459/regex-in-react-email-validation//
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if ((regex.test(email)) && (password.length >= NUMERO_MINIMO)) {
      this.setState({
        disabled: false,
      });
      console.log('email valido e senha valida');
    }
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div>
        <h3>Login</h3>
        <forms>
          <label htmlFor="email-bar">
            <input
              data-testid="email-input"
              type="email"
              id="email-bar"
              name="email"
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-bar">
            <input
              data-testid="password-input"
              type="password"
              id="password-bar"
              name="password"
              placeholder="Senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
        </forms>
        <button
          type="submit"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stateUserDispatch: (state) => dispatch(loginUser(state)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  stateUserDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
