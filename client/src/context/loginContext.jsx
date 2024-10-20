import { createContext } from 'react'

export const LoginContext = createContext()

export function LoginProvider ({ children }) {
  return (
    <LoginContext.Provider value={{
    }}
    >
      {children}
    </LoginContext.Provider>
  )
}
