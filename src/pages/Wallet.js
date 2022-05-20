import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies from '../actions/Currencies';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { userState, currencies } = this.props;
    return (
      <section>
        <header>
          <p data-testid="email-field">{userState.email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <fieldset>
            <input
              type="number"
              data-testid="value-input"
            />
            <input
              type="text"
              data-testid="description-input"
            />
            <label htmlFor="Moeda">
              Moeda
              <select id="Moeda">
                {currencies.map((currency) => (
                  (<option key={ currency }>{currency}</option>)
                ))}
              </select>
            </label>
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </fieldset>
        </form>
      </section>);
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  userState: propTypes.shape({
    email: propTypes.string.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(Wallet);
