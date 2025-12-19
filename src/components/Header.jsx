import { useRef } from 'react'
import { Plus, Download, Upload } from 'lucide-react'

function Header({ onAddClick, prompts, onImport }) {
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const data = JSON.stringify(prompts, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prompts-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        if (Array.isArray(data)) {
          onImport(data)
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
        alert('Ошибка: неверный формат файла')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-blue/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/LogoBP_YellowCircle.png" 
              alt="Best Practice Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                Библиотека промптов
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md"
              title="Импорт промптов"
            >
              <Upload className="w-5 h-5" />
            </button>

            <button
              onClick={handleExport}
              disabled={prompts.length === 0}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10"
              title="Экспорт промптов"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-dark-blue font-medium rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40"
            >
              <Plus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
              <span className="hidden sm:inline">Добавить</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
