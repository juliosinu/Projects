import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Form from '../Components/Form';
import Table from '../Components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.editState = this.editState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }
  // github iuri roque

  editState({ description, currency, method, tag, value }) {
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  clearState() {
    this.setState({
      value: '',
      description: '',
    });
  }

  // Github Iury Roque

  render() {
    const { description, currency, method, tag, value } = this.state;
    return (
      <div>
        <Header />
        <Form
          state={ { description, currency, method, tag, value } }
          clearState={ this.clearState }
          handleChange={ this.handleChange }
        />
        <Table editState={ this.editState } />
      </div>
    );
  }
}

export default connect(null, null)(Wallet);
