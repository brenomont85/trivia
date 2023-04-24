import { screen, waitFor } from '@testing-library/react'
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';
import mockRannkingStorage from './helpers/mockLocalStorage';

const initialState = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: {
    players: [
      {
        name: "",
        score: 0,
        gravatarUrl: "",
        assertions: 0,
      }
    ],
  }
}


describe('Testa a pagina de Rank', () => {
  beforeEach(()=> {
    localStorage.setItem('ranking', JSON.stringify(mockRannkingStorage));
  })

  test('Verifica se o logo é renderizado na tela', async () => {
    const { store } = renderWithRouterAndRedux(<Ranking />, { initialState });
    
      const avatar = screen.getAllByAltText('avatar')[0];
      expect(avatar).toBeInTheDocument();
  });
});
