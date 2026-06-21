const PatientSummary = ({ summary }) => {
  if (!summary) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">No hay datos de pacientes disponibles</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{summary.active || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Pacientes Activos</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{summary.newThisMonth || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Nuevos este Mes</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">{summary.totalVisits || 0}</div>
          <div className="text-sm text-gray-600 mt-1">Total Visitas</div>
        </div>
      </div>

      {summary.recentPatients && summary.recentPatients.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Pacientes Recientes</h4>
          <div className="space-y-2">
            {summary.recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🐾</span>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{patient.lastVisit}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    patient.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientSummary
