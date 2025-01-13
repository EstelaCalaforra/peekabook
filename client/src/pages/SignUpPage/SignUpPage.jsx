import { useSignup } from '../../hooks/useSignup'
import './SignUpPage.css'
import i18next from 'i18next'

export function SignUpPage () {
  const { handleSubmit, message, error, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useSignup()

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        <h2 className='signup-h2'>「 {i18next.t('Sign Up')} 」</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form autoComplete='off' className='signup-form' onSubmit={handleSubmit}>
          <div>
            <label>{i18next.t('Email')}</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='false'
            />
          </div>
          <div>
            <label>{i18next.t('Password')}</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
            />
          </div>
          <div>
            <label>{i18next.t('Confirm password')}</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='signup-button' type='submit'>{i18next.t('Sign Up')}</button>
        </form>
      </div>
      <p className='signup-p'>{i18next.t('Do you already have an account')}? <a className='signup-a' href='/login'>{i18next.t('Log in')}!</a></p>
    </div>
  )
}
