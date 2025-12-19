import { useState } from 'react'
import { Copy, Check, Star, Trash2, ExternalLink } from 'lucide-react'

function PromptCard({ prompt, categoryInfo, onView, onToggleFavorite, onDelete }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleFavorite = (e) => {
    e.stopPropagation()
    onToggleFavorite()
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      onClick={onView}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-5 cursor-pointer hover:bg-white/15 transition-all duration-200"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{categoryInfo.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{prompt.title}</h3>
          <span className="inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs rounded mt-1">
            {categoryInfo.name}
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-sm line-clamp-3 mb-3 whitespace-pre-wrap">
        {prompt.content}
      </p>

      {prompt.url && (
        <a
          href={prompt.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-gold/70 hover:text-gold text-xs mb-3 truncate"
        >
          <ExternalLink className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{prompt.url}</span>
        </a>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Скопировано
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Копировать
            </>
          )}
        </button>

        <button
          onClick={handleFavorite}
          className={`p-2 rounded-lg transition-all duration-200 ${
            prompt.isFavorite
              ? 'bg-gold/20 text-gold'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Star className={`w-4 h-4 ${prompt.isFavorite ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PromptCard
