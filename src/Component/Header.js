import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      despesa: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { despesa } = this.state;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <p data-testid="total-field">{ despesa }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
