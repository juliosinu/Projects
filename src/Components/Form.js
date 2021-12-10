import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, changeFormButton, addCurrencies, addExpenses } from '../actions';

const URL_API = 'https://economia.awesomeapi.com.br/json/all';

class Form extends React.Component {
  constructor() {
    super();
    this.fetchAPI = this.fetchAPI.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.onClick = this.onClick.bind(this);
    this.updateEdit = this.updateEdit.bind(this);
    this.stateButton = this.stateButton.bind(this);
  }

  componentDidMount() {
    this.renderCurrency();
  }

  async onClick() {
    const { state: { value, description, currency, method, tag } } = this.props;
    const { expenses, dispatchExpenses, clearState } = this.props;
    const id = expenses.length;
    const exchangeRates = await this.fetchAPI();
    const expensesObject = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatchExpenses(expensesObject);
    clearState();
  }

  async fetchAPI() {
    const response = await fetch(URL_API);
    const json = await response.json();
    return json;
  }
  // Github Iuri Roque

  updateEdit() {
    const {
      dispatchEdit,
      expenses,
      changeExpense,
      dispatchChangeFormButton,
      clearState,
      state } = this.props;
    const ONE = 1;
    const NEGATIVE_ONE = -1;
    const ZERO = 0;
    const element = expenses.find((expense) => expense.id === changeExpense.id);
    const element2 = expenses.filter((expense) => element.id !== expense.id);
    const objeto = { ...state, id: element.id, exchangeRates: element.exchangeRates };
    element2.push(objeto);
    const element3 = element2.sort((prev, current) => {
      if (prev.id < current.id) {
        return NEGATIVE_ONE;
      } if (prev.id > current.id) {
        return ONE;
      }
      return ZERO;
    });
    dispatchEdit(element3);
    dispatchChangeFormButton(false);
    clearState();
  }

  stateButton(stateFormButton) {
    if (stateFormButton === true) {
      return (
        <button type="button" onClick={ this.updateEdit }>Editar despesa</button>
      );
    }
    return (
      <button type="button" onClick={ this.onClick }>Adicionar despesa</button>
    );
  }

  async renderCurrency() {
    const { dispatchCurrencies } = this.props;
    const nada = await this.fetchAPI();
    const currencies = Object.keys(nada);
    const retiraUSDT = currencies.filter((currency) => {
      if (currency !== 'USDT') {
        return currency;
      } return false;
    });
    dispatchCurrencies(retiraUSDT);
  }

  renderInputs() {
    const { state } = this.props;
    const { handleChange } = this.props;
    return (
      <div>
        <input
          type="text"
          data-testid="value-input"
          name="value"
          id="form-value"
          value={ state.value }
          onChange={ handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          id="form-description"
          value={ state.description }
          onChange={ handleChange }
        />
      </div>
    );
  }

  render() {
    const { state,
      currencies,
      changeExpense,
      stateFormButton,
      handleChange } = this.props;
    return (
      <form>
        { this.renderInputs(changeExpense) }
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            value={ state.currency }
            name="currency"
            id="currency"
            onChange={ handleChange }
          >
            { currencies.map((cur) => (
              <option key={ cur } value={ cur }>{ cur }</option>
            ))}
          </select>
        </label>
        <select
          data-testid="method-input"
          name="method"
          value={ state.method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ state.tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { this.stateButton(stateFormButton) }
      </form>
    );
  }
}

Form.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  changeExpense: PropTypes.shape(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateFormButton: PropTypes.bool.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
  dispatchChangeFormButton: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,

  state: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(addCurrencies(currencies)),
  dispatchExpenses: (expenses) => dispatch(addExpenses(expenses)),
  dispatchChangeFormButton: (buttonValue) => dispatch(changeFormButton(buttonValue)),
  dispatchEdit: (expenses) => dispatch(deleteExpenses(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  changeExpense: state.wallet.changeExpense,
  stateFormButton: state.wallet.changeFormButton,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
