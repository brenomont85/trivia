import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends Component {
  state = {
    listPlayers: [],
  };

  componentDidMount() {
    const listPlayers = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ listPlayers });
  }

  render() {
    const { listPlayers } = this.state;
    return (
      <main className="main-ranking">
        <div className="header-ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/">
            <button
              className="rank-btn"
              data-testid="btn-go-home"
              type="button"
            >
              Go Home
            </button>
          </Link>
        </div>
        <div className="box-ranking">
          {
            listPlayers
              .map((player, index) => (
                <div className="box-rank" key={ index }>
                  <img
                    alt="avatar"
                    src={ player.gravatarEmail }
                  />
                  <h2 data-testid={ `player-score-${index}` }>{ player.score }</h2>
                  <h2 data-testid={ `player-name-${index}` }>{ player.name }</h2>
                </div>
              ))
          }
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Ranking);
