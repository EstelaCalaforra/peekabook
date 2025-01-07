import './LoginPage.css'
import { useLogin } from '../../hooks/useLogin'

export function LoginPage () {
  const { handleSubmit, error, message, email, setEmail, password, setPassword } = useLogin()

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2 className='login-h2'>「 Login 」 </h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type='submit'>Login</button>
        </form>
      </div>
      <p className='login-p'>Don&apos;t have an account yet? <a className='login-a' href='/signup'>Sign up!</a></p>
    </div>
  )
}
