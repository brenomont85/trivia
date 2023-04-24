import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <img
          alt="Avatar do usuário"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}` }
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-h3layer-name">{ name }</h1>
        <h1 data-testid="header-score">{ score }</h1>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Header);
