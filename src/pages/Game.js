import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../styles/Game.css';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <Header />
        <Questions history={ history } />
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
