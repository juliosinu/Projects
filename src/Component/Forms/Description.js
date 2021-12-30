import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Description extends Component {
  render() {
    const { onChange, value } = this.props;
    return (
      <div>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            name="description"
            value={ value }
            data-testid="description-input"
            onChange={ onChange }
            placeholder="Descrição"
          />
        </label>
      </div>
    );
  }
}

Description.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
