import { useState } from 'react'
import { X, Copy, Check, Star, Trash2, ExternalLink, Calendar } from 'lucide-react'

function ViewPromptModal({ prompt, categoryInfo, onClose, onToggleFavorite, onDelete }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-steel-blue border border-white/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-steel-blue border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{categoryInfo.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{prompt.title}</h2>
              <span className="inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs rounded mt-1">
                {categoryInfo.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <p className="text-gray-200 whitespace-pre-wrap">{prompt.content}</p>
          </div>

          {prompt.url && (
            <a
              href={prompt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold hover:text-yellow-400 text-sm mb-4"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="truncate">{prompt.url}</span>
            </a>
          )}

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Calendar className="w-4 h-4" />
            <span>Добавлен {formatDate(prompt.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gold hover:bg-yellow-500 text-dark-blue'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
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
              onClick={onToggleFavorite}
              className={`p-3 rounded-lg transition-all duration-200 ${
                prompt.isFavorite
                  ? 'bg-gold/20 text-gold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Star className={`w-5 h-5 ${prompt.isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onDelete}
              className="p-3 bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200"
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
