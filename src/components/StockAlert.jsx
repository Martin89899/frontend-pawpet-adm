const StockAlert = ({ alert }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-50 border-red-500'
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-500'
      default:
        return 'bg-orange-50 border-orange-500'
    }
  }

  const getTypeIcon = (type) => {
    return type === 'VACCINE' ? '💉' : '💊'
  }

  return (
    <div className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{getTypeIcon(alert.type)}</span>
          <div>
            <h4 className="font-semibold text-gray-900">{alert.name}</h4>
            <p className="text-sm text-gray-600">
              Tipo: {alert.type === 'VACCINE' ? 'Vacuna' : 'Remedio'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{alert.currentStock}</div>
          <div className="text-xs text-gray-500">Stock actual</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Stock mínimo: {alert.minStock}</span>
          <span className="text-red-600 font-medium">
            Faltan: {alert.minStock - alert.currentStock}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{
              width: `${Math.min((alert.currentStock / alert.minStock) * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default StockAlert
