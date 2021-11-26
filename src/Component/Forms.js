import React, { Component } from 'react'

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      expense: '',
      description: '',
      currence: '',
      methodPayment: '',
      tagMethod: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { stateUserDispatch } = this.props;
    stateUserDispatch(this.state);
  }

  render() {
    const { expense, description, currence, methodPayment, tagMethod } = this.state;
    return (
      <div>
      <form>
        <label htmlFor="expense-input" >
          <input
            type="number"
            id="expense-input"
            name="expense"
            value={ expense }
            data-testid="value-input"
            placeholder="Valor da despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currence-input">
          <select
            id="currence-input"
            data-testid="currency-input"
            name="currence"
            value={ currence }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="payment-method">Método de pagamento
          <select
            id="payment-method"
            data-testid="method-input"
            name="methodPayment"
            value={ methodPayment }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-method">Tag
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tagMethod"
            value={ tagMethod }
            onChange={ this.handleChange }
          >
            <option value="alminentaçao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
      <button
      type="button"
      >
        Adicionar despesa
      </button>
        
      </div>
    )
  }
}

export default Forms;
