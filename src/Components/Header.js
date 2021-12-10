import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { loginUser, expenses } = this.props;
    let sum = 0;
    expenses.forEach((expense) => {
      sum += (expense.value * expense.exchangeRates[expense.currency].ask);
    });
    return (
      <div>
        <p data-testid="email-field">{ loginUser }</p>
        <p data-testid="total-field">{ sum }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loginUser: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
