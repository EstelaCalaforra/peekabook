/* eslint-disable quotes */
import './LoginPage.css'
import { useLogin } from '../../hooks/useLogin'
import i18next from 'i18next'

export function LoginPage () {
  const { handleSubmit, error, message, email, setEmail, password, setPassword } = useLogin()

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2 className='login-h2'>「 {i18next.t('Login')} 」 </h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
          <div>
            <label htmlFor='email'>{i18next.t('Email')}</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>{i18next.t('Password')}</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type='submit'>{i18next.t('Login')}</button>
        </form>
      </div>
      <p className='login-p'>{i18next.t("Don't have an account yet")}? <a className='login-a' href='/signup'>{i18next.t('Sign up')}!</a></p>
    </div>
  )
}
