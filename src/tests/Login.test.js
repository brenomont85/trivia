import { screen, waitFor } from '@testing-library/react'
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';


describe('Testes da página de Login', () => {
  test('Verifique se na tela de Login é renderizado um input de email e um de nome', () => {
    renderWithRouterAndRedux(<App />)

    const nome = screen.getByRole('textbox', {
      name: /nome/i
    })

    const email = screen.getByRole('textbox', {
      name: /email/i
    })

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
  });

  test('Verifique se é renderizado um botão com o texto "Play"', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /play/i,
    });

    expect(button).toBeInTheDocument();
  });

  test('Verifique se os inputs de nome e email estão sendo validados para habilitar o botão "Play"', () => {
    renderWithRouterAndRedux(<App />);

    const nome = screen.getByRole('textbox', {
      name: /nome/i
    })

    const email = screen.getByRole('textbox', {
      name: /email/i
    })

    const button = screen.getByRole('button', {
      name: /play/i
    })

    expect(button.disabled).toBe(true);
    userEvent.type(nome, 'teste');
    userEvent.type(email, 'teste@teste.com');
    expect(button.disabled).toBe(false);
  });

  test('Verifique se ao clicar no botão "Play" faz a requisição da API cria um token e é salvo no localStorage', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        response_code: 0,
        response_message: 'Token Generated Successfully!',
        token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
      }),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const nome = screen.getByRole('textbox', {
      name: /nome/i
    })

    const email = screen.getByRole('textbox', {
      name: /email/i
    })

    const button = screen.getByRole('button', {
      name: /play/i
    })

    expect(button.disabled).toBe(true);
    userEvent.type(nome, 'teste');
    userEvent.type(email, 'teste@teste.com');
    expect(button.disabled).toBe(false);

    userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeDefined();
      expect(history.location.pathname).toBe('/game');
    });
  });

  test('Verifique se o botão Settings é renderizado na tela e se ao clicar nele é redirecionado para a página Settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const button = screen.getByRole('button', {
      name: /settings/i
    })

    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/settings');
  });

})
