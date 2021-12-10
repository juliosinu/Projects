import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFormButton, changeExpenses, deleteExpenses } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  editItem(id) {
    const {
      expenses,
      dispatchEditExpenses,
      dispatchChangeFormButton,
      editState } = this.props;
    dispatchEditExpenses(expenses[id]);
    editState(expenses[id]);
    dispatchChangeFormButton(true);
  }

  removeItem(id) {
    const { expenses, dispatchExpenses } = this.props;
    const removeExpense = expenses.filter((expense) => {
      if (expense.id !== id) {
        return expense;
      } return false;
    });
    dispatchExpenses(removeExpense);
  }

  renderBtn(id) {
    return (
      <td>
        <button
          data-testid="edit-btn"
          type="button"
          onClick={ () => this.editItem(id) }
        >
          Editar
        </button>
        <button
          data-testid="delete-btn"
          type="button"
          onClick={ () => this.removeItem(id) }
        >
          Excluir
        </button>
      </td>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method}</td>
            <td>{ expense.value}</td>
            <td>{ expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
            <td>
              { parseFloat(expense
                .exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>
              { parseFloat(expense
                .value * expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>Real</td>
            { this.renderBtn(expense.id) }
          </tr>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchEditExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchChangeFormButton: PropTypes.func.isRequired,
  editState: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(deleteExpenses(expenses)),
  dispatchEditExpenses: (expenses) => dispatch(changeExpenses(expenses)),
  dispatchChangeFormButton: (buttonValue) => dispatch(changeFormButton(buttonValue)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  changeFormButton: state.wallet.changeFormButton,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
