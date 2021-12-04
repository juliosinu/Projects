import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaymentMethod extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <div>
        <label htmlFor="payment-method">
          Método de pagamento
          <select
            id="payment-method"
            data-testid="method-input"
            name="method"
            value={ value }
            onChange={ onChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

PaymentMethod.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
