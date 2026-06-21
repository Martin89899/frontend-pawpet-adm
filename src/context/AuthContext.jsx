import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'))

  const login = (newToken, role) => {
    setToken(newToken)
    setUserRole(role)
    localStorage.setItem('token', newToken)
    localStorage.setItem('userRole', role)
  }

  const logout = () => {
    setToken(null)
    setUserRole(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }

  const isAuthenticated = () => {
    return !!token
  }

  const hasRole = (role) => {
    return userRole === role
  }

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
