import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { SignUpPage } from './SignUpPage'
import { useAuth } from '../../context/AuthContext'

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    setIsAuthenticated: vi.fn(),
    authToken: '',
    setAuthToken: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    userId: '',
    setUserId: vi.fn(),
    userEmail: '',
    setUserEmail: vi.fn(),
  })),
}))

// Mock react-router
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn()
}))

// Mock translations
vi.mock('i18next', () => ({
  __esModule: true,
  default: {
    t: vi.fn((key) => key)
  },
  t: vi.fn((key) => key)
}))

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: true,
        userId: '123',
        userEmail: 'test@example.com',
        token: 'mock-token',
        message: 'User registered successfully'
      })
  })
)

afterEach(() => {
  vi.restoreAllMocks()
})

test('<SignUpPage /> handles signup flow', async () => {
  const mockNavigate = vi.fn()
  const mockSetIsAuthenticated = vi.fn()
  const mockSetUserId = vi.fn()
  const mockSetAuthToken = vi.fn()

  // Mock useAuth to provide necessary methods and properties
  const mockUseAuth = {
    login: vi.fn(),
    logout: vi.fn(),
    setIsAuthenticated: mockSetIsAuthenticated,
    isAuthenticated: false,
    setUserId: mockSetUserId,
    setAuthToken: mockSetAuthToken
  }

  vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  vi.mocked(useAuth).mockReturnValue(mockUseAuth)

  const user = userEvent.setup()

  // Mock server response
  fetch.mockResolvedValueOnce({
    json: async () => ({
      success: true,
      userId: '123',
      userEmail: 'test@example.com',
      token: 'fake-token',
      message: 'User registered successfully'
    })
  })

  render(<SignUpPage />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getAllByLabelText(/password/i)[0]
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
  const submitButton = screen.getByRole('button', { name: /sign up/i })

  // Fill and submit the form
  await user.type(emailInput, 'test@example.com')
  await user.type(passwordInput, 'password123')
  await user.type(confirmPasswordInput, 'password123')
  await user.click(submitButton)

  // Validate the fetch is called with correct parameters
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/users\/signup$/), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  // Ensure the success message appears
  expect(await screen.findByText(/Signup successful/i)).toBeInTheDocument()
})
