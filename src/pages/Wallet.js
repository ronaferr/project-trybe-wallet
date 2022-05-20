import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { userState } = this.props;
    return (
      <section>
        <header>
          <p data-testid="email-field">{userState.email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </section>);
  }
}

const mapStateToProps = (state) => ({
  userState: state.user });

Wallet.propTypes = {
  userState: propTypes.shape({
    email: propTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
