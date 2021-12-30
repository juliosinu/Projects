import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions/index';

class Table extends Component {
  constructor() {
    super();
    this.tableRender = this.tableRender.bind(this);
  }

  tableRender() {
    const { expenses, deleteDispatch } = this.props;
    console.log(expenses);
    return expenses.map((expense) => {
      const { id, description, tag, value, method, exchangeRates, currency } = expense;
      const { ask, name } = exchangeRates[currency];
      // Logica arredondamento github de Miguel Reis
      const roundValue = Math.round(value * 100) / 100;
      const roundAsk = Math.round(ask * 100) / 100;
      const roundResult = Math.round(value * ask * 100) / 100;
      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ roundValue }</td>
          <td>{ name }</td>
          <td>{ roundAsk }</td>
          <td>{ roundResult }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => deleteDispatch(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <thead>
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
            { this.tableRender() }
          </tr>
        </thead>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
