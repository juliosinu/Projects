import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses } from '../actions';
import { fetchAPI } from '../actions/api';
import Currence from './Forms/Currence';
import Expense from './Forms/Expense';
import Description from './Forms/Description';
import PaymentMethod from './Forms/PaymentMethod';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { getUserAPI } = this.props;
    getUserAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // Github Miguel Reis.
  currency() {
    const { currencies } = this.props;
    return Object.keys(currencies).map((coins) => (
      coins === 'USDT' ? false : (
        <option data-testid={ coins } key={ coins }>{ coins }</option>
      )
    ));
  }

  handleClick() {
    const { currencies, getUserAPI } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    getUserAPI();
    this.setState((previousState) => ({ id: previousState.id + 1 }));
    this.setState({ value: 0 });
    const { useForm } = this.props;
    useForm({ id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies });
  }

  render() {
    const { value, description, method, id } = this.state;
    return (
      <div>
        <form>
          <Expense onChange={ this.handleChange } value={ value } />
          <Description onChange={ this.handleChange } value={ description } />
          <Currence
            onChange={ this.handleChange }
            valor={ this.currency() }
            id={ id }
          />
          <PaymentMethod onChange={ this.handleChange } value={ method } />
          <label htmlFor="tag-method">
            Tag
            <select
              id="tag-method"
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  getUserAPI: () => dispatch(fetchAPI()),
  useForm: (state) => dispatch(addExpenses(state)),
});

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserAPI: PropTypes.func.isRequired,
  useForm: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Forms);
