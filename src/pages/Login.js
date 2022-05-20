import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getEmail from '../actions/EmailAction';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const MIN_LENGHT_PASSWORD = 6;
    const REGEX_EMAIL = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {
      const { email, password } = this.state;
      if (password.length >= MIN_LENGHT_PASSWORD
      && REGEX_EMAIL.test(email)
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  clickButton(value) {
    const { saveEmail } = this.props;
    saveEmail(value);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <section>
        <form>
          <fieldset>
            <input
              type="text"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => { this.clickButton(email); } }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </section>);
  }
}

Login.propTypes = {
  saveEmail: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (state) => dispatch(getEmail(state)) });

export default connect(null, mapDispatchToProps)(Login);
