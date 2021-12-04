import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.renderExpense = this.renderExpense.bind(this);
  }

  renderExpense() {
    const { expenses } = this.props;
    console.log(expenses, 'ola');
    let result = 0;
    expenses.forEach((expense) => {
      const { ask } = expense.exchangeRates[expense.currency];
      const expenseValue = expense.value;
      result += ask * expenseValue;
    });
    return result;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <p data-testid="total-field">{ this.renderExpense() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
