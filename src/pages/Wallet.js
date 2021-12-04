import React from 'react';
import Header from '../Component/Header';
import Forms from '../Component/Forms';
import Table from '../Component/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
        <Table />
      </div>
    );
  }
}

export default Wallet;
