import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.tableRender = this.tableRender.bind(this);
  }

  tableRender() {
    const { expenses } = this.props;
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
            >
              Editar/Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table>
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
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
