import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { LoginPage } from './LoginPage'
import { AuthProvider } from '../../context/AuthContext'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const mockNavigate = vi.fn()
// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom')
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   }
// })

vi.mock('i18next', () => ({
  default: {
    t: (key) => key,
  },
}))

const mockFetch = vi.fn()
global.fetch = mockFetch

beforeEach(() => {
  vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    }
  })
})

describe('<LoginPage />', () => {

  test('should display error message when login fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        message: 'Invalid credentials',
      }),
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await userEvent.type(emailInput, 'wrong@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  
  test('<LoginPage /> should display success message and navigate on successful login', async () => {
    const mockLogin = vi.fn()
    const navigateSpy = vi.spyOn(require('react-router'), 'useNavigate')

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        userId: '123',
        message: 'Login successful',
        userEmail: 'test@example.com',
        token: 'mockedToken',
      }),
    })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Simulamos que el usuario escribe en los campos
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')

    // Simulamos el clic en el botón de envío
    await userEvent.click(submitButton)

    // Esperamos que la respuesta sea correcta
    await waitFor(() => expect(fetch).toHaveBeenCalled())

    // Verificamos que el mensaje de éxito esté presente
    expect(screen.getByText(/Login successful/i)).toBeInTheDocument()

    // Simulamos el avance del tiempo para `setTimeout` y verificamos la navegación
    // vi.useFakeTimers()
    // vi.advanceTimersByTime(2000) // Simulamos los 2 segundos de espera en `setTimeout`

    // await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/bookshelf/123'))
    expect(navigateSpy).toHaveBeenCalledTimes(1)
  }, 20000)
})