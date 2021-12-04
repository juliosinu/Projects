import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Currence extends Component {
  render() {
    const { onChange, valor } = this.props;
    return (
      <div>
        <label htmlFor="currence-input">
          Moedas
          <select
            id="currence-input"
            data-testid="currency-input"
            name="currency"
            onChange={ onChange }
          >
            { valor }
          </select>
        </label>
      </div>
    );
  }
}

Currence.propTypes = {
  onChange: PropTypes.func.isRequired,
  valor: PropTypes.arrayOf(PropTypes.object).isRequired,
};
