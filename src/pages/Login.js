import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { nameAcess } from '../redux/actions/loginAction';
import { resetScore } from '../redux/actions/gameAction';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetScore());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { email, name } = this.state;
    const MIN = 0;
    const validate = /^\S+@\S+\.\S+$/;

    if (email.match(validate) && name.length > MIN) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleSubmit = async () => {
    const { history, dispatch } = this.props;

    const token = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJson = await token.json();
    const finalToken = tokenJson.token;
    localStorage.setItem('token', finalToken);
    dispatch(nameAcess(this.state));
    history.push('/game');
  };

  render() {
    const { isDisable } = this.state;
    return (
      <main className="login-container">
        <img src={ logo } width="300px" className="App-logo" alt="logo" />
        <form>
          <label htmlFor="name">
            Name
            <input
              onChange={ this.handleChange }
              type="text"
              name="name"
              id="name"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={ this.handleChange }
              type="email"
              name="email"
              id="email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            disabled={ isDisable }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Settings
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
