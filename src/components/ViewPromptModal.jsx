import { useState } from 'react'
import { X, Copy, Check, Star, Trash2, ExternalLink, Calendar, Edit } from 'lucide-react'

function ViewPromptModal({ prompt, categoryInfo, onClose, onToggleFavorite, onDelete, onEdit }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative bg-steel-blue border border-white/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl shadow-black/50">
        <div className="sticky top-0 bg-gradient-to-r from-steel-blue to-steel-blue/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{categoryInfo.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{prompt.title}</h2>
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-gold/20 to-yellow-400/20 text-gold text-xs font-medium rounded-full border border-gold/30 mt-1">
                {categoryInfo.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 backdrop-blur-sm">
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{prompt.content}</p>
          </div>

          {prompt.url && (
            <a
              href={prompt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold hover:text-yellow-400 text-sm mb-6 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="truncate">{prompt.url}</span>
            </a>
          )}

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
            <Calendar className="w-4 h-4" />
            <span>Добавлен {formatDate(prompt.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 ${
                copied
                  ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-dark-blue shadow-lg shadow-gold/30'
              }`}
              title="Копировать промпт"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  Скопировано
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Копировать
                </>
              )}
            </button>

            <button
              onClick={onEdit}
              className="p-3 bg-white/10 text-white hover:bg-gold/20 hover:text-gold rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md hover:shadow-gold/20"
              title="Редактировать промпт"
            >
              <Edit className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md ${
                prompt.isFavorite
                  ? 'bg-gold/20 text-gold shadow-lg shadow-gold/20'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={prompt.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              <Star className={`w-5 h-5 transition-transform duration-200 ${prompt.isFavorite ? 'fill-current scale-110' : 'hover:scale-110'}`} />
            </button>

            <button
              onClick={onDelete}
              className="p-3 bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md hover:shadow-red-500/20"
              title="Удалить промпт"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPromptModal
