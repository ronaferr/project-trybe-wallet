import React from 'react';
import propTypes from 'prop-types';
import '../css/Wallet.css';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpense } from '../actions/Currencies';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.clickBtnForm = this.clickBtnForm.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      totalExpenses: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async clickBtnForm() {
    // pegar state
    const { value, description, currency, method, tag, totalExpenses } = this.state;
    const { dispatch, expenses } = this.props;
    // pegar resultado API
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dados = await response.json();
    delete dados.USDT;
    // adcionar id com o expensive.length
    const dataExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: dados,
    };
    const convertExpense = Number((value * dados[`${currency}`].ask));
    const sumExpense = (totalExpenses + convertExpense);
    dispatch(saveExpense(dataExpense));
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      totalExpenses: sumExpense,
    });
  }

  render() {
    const { userState, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, totalExpenses } = this.state;
    return (
      <section>
        <header className="headerWallet">
          <h1>Trybe Wallet</h1>
          <div className="emailWallet">
            <p data-testid="email-field">
              Email:
              {userState.email}
            </p>
            <p
              data-testid="total-field"
              className="valueExpense"
            >
              Despesa Total:
              { totalExpenses.toFixed(2) }
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form className="formExpense">
          <label htmlFor="inputValue">
            Value
            <input
              id="inputValue"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="inputDescription">
            Description
            <input
              id="inputDescription"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="Moeda">
            Moeda
            <select
              id="Moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((typeCurrency) => (
                (<option key={ typeCurrency }>{typeCurrency}</option>)
              ))}
            </select>
          </label>
          <label htmlFor="Method">
            Method
            <select
              id="Method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="Tag">
            Tag
            <select
              id="Tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.clickBtnForm }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Tag
              </th>
              <th>
                Método de pagamento
              </th>
              <th>
                Valor
              </th>
              <th>
                Moeda
              </th>
              <th>
                Câmbio utilizado
              </th>
              <th>
                Valor convertido
              </th>
              <th>
                Moeda de conversão
              </th>
              <th>
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description}</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {(expense.value * Number(expense.exchangeRates[expense.currency].ask))
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button type="button" className="btnEdit">Editar</button>
                  <button type="button" className="btnDelete">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>);
  }
}

const mapStateToProps = (state) => ({
  userState: state.user,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  userState: propTypes.shape({
    email: propTypes.string.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    value: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    currency: propTypes.string.isRequired,
    method: propTypes.string.isRequired,
    exchangeRates: propTypes.objectOf(propTypes.string.isRequired).isRequired,
  }).isRequired).isRequired,
};

export default connect(mapStateToProps)(Wallet);
