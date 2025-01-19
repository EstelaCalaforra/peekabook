import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LoginPage } from './LoginPage'

// Mock context
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

// Mock router
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn()
}))

// Mock traductions
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
        token: 'mock-token'
      })
  })
)

afterEach(() => {
  vi.restoreAllMocks()
})

test('<LoginPage /> handles login flow', async () => {
  const mockLogin = vi.fn()
  const mockNavigate = vi.fn()

  // Mocks configuration to return simulated functions
  useAuth.mockReturnValue({ login: mockLogin })
  vi.mocked(useNavigate).mockReturnValue(mockNavigate)

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

  render(<LoginPage />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /login/i })

  // Mock filling and sending the form
  await user.type(emailInput, 'test@example.com')
  await user.type(passwordInput, 'password123')
  await user.click(submitButton)

  // Validate the fetch is called with correct params
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/users\/login$/), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
  })

  // Validate login context is called
  expect(mockLogin).toHaveBeenCalledWith('123', 'test@example.com', 'fake-token')

  // Validate redirection
  // expect(mockNavigate).toHaveBeenCalledWith('/bookshelf/123')
})
