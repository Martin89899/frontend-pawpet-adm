import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import StockAlert from '../components/StockAlert'
import StatCard from '../components/StatCard'
import PatientSummary from '../components/PatientSummary'

const API_BASE_URL = 'http://localhost:8085'

const Dashboard = () => {
  const { token, logout } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bff/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setDashboardData(response.data)
      } catch (err) {
        setError('Error al cargar los datos del dashboard')
        console.error('Error fetching dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">PawPet</h1>
              <span className="ml-4 text-gray-500">Dashboard Administrativo</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Resumen general del sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Insumos"
            value={dashboardData?.totalSupplies || 0}
            icon="📦"
            color="blue"
          />
          <StatCard
            title="Total Pacientes"
            value={dashboardData?.totalPatients || 0}
            icon="🐕"
            color="green"
          />
          <StatCard
            title="Alertas Críticas"
            value={dashboardData?.criticalAlerts?.length || 0}
            icon="⚠️"
            color="red"
          />
        </div>

        {/* Inventory Management Link */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/admin/inventory'}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Gestión de Inventario
          </button>
        </div>

        {/* Critical Stock Alerts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Alertas de Stock Crítico
          </h3>
          {dashboardData?.criticalAlerts && dashboardData.criticalAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.criticalAlerts.map((alert, index) => (
                <StockAlert key={index} alert={alert} />
              ))}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-700">No hay alertas de stock crítico</p>
            </div>
          )}
        </div>

        {/* Patient Summary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Resumen de Pacientes
          </h3>
          <PatientSummary summary={dashboardData?.patientSummary} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
