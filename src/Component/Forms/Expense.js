import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Expense extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <div>
        <label htmlFor="expense-input">
          <input
            type="number"
            id="expense-input"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Valor da despesa"
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

Expense.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
