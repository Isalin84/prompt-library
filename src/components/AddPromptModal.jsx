import { useState } from 'react'
import { X, Star } from 'lucide-react'

function AddPromptModal({ categories, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('text')
  const [url, setUrl] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      url: url.trim(),
      isFavorite,
    })
  }

  const isValid = title.trim() && content.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-steel-blue border border-white/20 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-steel-blue border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Добавить промпт</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Название промпта *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название..."
              maxLength={200}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Текст промпта *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Введите текст промпта..."
              rows={6}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Категория
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-steel-blue">
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ссылка на источник (опционально)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/prompt"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isFavorite
                  ? 'bg-gold/20 text-gold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>Избранное</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                isValid
                  ? 'bg-gold hover:bg-yellow-500 text-dark-blue'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Сохранить промпт
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPromptModal
