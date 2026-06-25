import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

// Configuración global de Axios crítica para la integración de PawPet:
// Permite que las cookies seguras (httpOnly) viajen automáticamente entre el puerto 3000 y el 8085
axios.defaults.withCredentials = true

export const AuthProvider = ({ children }) => {
  // Ya no dependemos de localStorage para el token, pero podemos conservar el userRole de manera opcional
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole'))
  // Estado para verificar si está autenticado basándonos en la respuesta exitosa del BFF
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('userRole'))
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      // 1. Invocamos al endpoint POST que creamos en tu bff-administracion (Puerto 8085)
      const response = await axios.post('http://localhost:8085/api/bff/admin/login', {
        email,
        password
      })

      if (response.status === 200) {
        // 2. Extraemos los datos básicos devueltos (por ejemplo, el rol del usuario asignado)
        // Nota: El access_token real NO viene aquí, se almacena solo en el navegador como cookie httpOnly
        const data = response.data
        const role = data.role || 'ADMIN' // Asigna un rol por defecto si no viene explícito
        
        setUserRole(role)
        setIsLogged(true)
        localStorage.setItem('userRole', role)
        
        return { success: true }
      }
    } catch (error) {
      console.error("Error en la autenticación de PawPet:", error)
      
      // Capturamos las excepciones de transporte controladas en tu BFF
      if (error.response && error.response.status === 401) {
        return { success: false, message: "El correo o la contraseña son incorrectos." }
      }
      return { success: false, message: "El servicio de autenticación no se encuentra disponible temporalmente." }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUserRole(null)
    setIsLogged(false)
    localStorage.removeItem('userRole')
    // Opcional: Si tu compañero requiere destruir la cookie en el backend, se agrega un axios.post aquí
  }

  // Mantenemos tus mismas funciones auxiliares para que tu ProtectedRoute.jsx siga funcionando al 100%
  const isAuthenticated = () => {
    return isLogged
  }

  const hasRole = (role) => {
    return userRole === role
  }

  return (
    <AuthContext.Provider value={{ userRole, login, logout, isAuthenticated, hasRole, loading }}>
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