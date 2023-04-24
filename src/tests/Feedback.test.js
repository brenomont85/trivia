import { screen, waitFor } from '@testing-library/react'
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';


describe('Testes da página de Feedback', () => {
  test('Verifique se na tela de Feedback é renderizado a pontuação do usuário', () => {
    renderWithRouterAndRedux(<Feedback />)

    const score = screen.getByTestId('feedback-total-score')

    expect(score).toBeInTheDocument()
  });

  test('Verifique se na tela de Feedback é renderizado a quantidade de acertos do usuário', () => {
    renderWithRouterAndRedux(<Feedback />)

    const assertions = screen.getByTestId('feedback-total-question')

    expect(assertions).toBeInTheDocument()
  });

  test('Verifique se na tela de Feedback é renderizado um texto de acordo com a quantidade de acertos que o usuário obteve', () => {
    renderWithRouterAndRedux(<Feedback />)

    const text = screen.getByTestId('feedback-text')

    expect(text).toBeInTheDocument()
  });

  test('Verifique se o botão Play Again é renderizado na tela e se ao clicar nele é redirecionado para a página inicial"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const button = screen.getByRole('button', {
      name: /play again/i
    })

    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifique se o botão Ranking é renderizado na tela e se ao clicar nele é redirecionado para a página Ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const button = screen.getByRole('button', {
      name: /ranking/i
    })

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    await waitFor(() => { 
      expect(history.location.pathname).toBe('/ranking');
    })

  });
 
})
