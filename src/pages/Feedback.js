import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { addPlayer } from '../redux/actions/gameAction';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score, name, gravatarEmail, dispatch } = this.props;
    const NUMBER = 3;

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    const currentStorage = JSON.parse(localStorage.getItem('ranking'));

    const savedPlayer = {
      name,
      score,
      gravatarEmail: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`,
      assertions,
    };

    const listPlayers = [...currentStorage, savedPlayer];
    const listPlayersOrder = listPlayers.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(listPlayersOrder));
    dispatch(addPlayer(savedPlayer));

    return (
      <main>
        <Header />
        <div className="fb-container">
          <div className="fb-box-one">
            <label>
              Score
              <h1 data-testid="feedback-total-score">{ score }</h1>
            </label>

            <label>
              Assertions
              <h1 data-testid="feedback-total-question">{ assertions }</h1>
            </label>
          </div>

          { (assertions < NUMBER)
            ? <h3 className="fb-bad" data-testid="feedback-text">Could be better...</h3>
            : <h3 className="fb-good" data-testid="feedback-text">Well Done!</h3> }

          <div className="fb-box-2">
            <Link to="/">
              <button
                className="fb-btn"
                data-testid="btn-play-again"
                type="button"
              >
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button
                className="fb-btn"
                data-testid="btn-ranking"
                type="button"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
