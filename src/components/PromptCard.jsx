import { useState } from 'react'
import { Copy, Check, Star, Trash2, ExternalLink, Edit } from 'lucide-react'

function PromptCard({ prompt, categoryInfo, onView, onToggleFavorite, onDelete, onEdit }) {
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

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <div
      onClick={onView}
      className={`group relative bg-white/10 backdrop-blur-sm border rounded-xl p-6 lg:p-7 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold/20 ${
        prompt.isFavorite
          ? 'border-gold/40 shadow-lg shadow-gold/10'
          : 'border-white/20 hover:border-white/30 hover:bg-white/15'
      }`}
    >
      {prompt.isFavorite && (
        <div className="absolute top-3 right-3">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-lg shadow-gold/50" />
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{categoryInfo.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg truncate mb-1">{prompt.title}</h3>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-gold/20 to-yellow-400/20 text-gold text-xs font-medium rounded-full border border-gold/30">
            {categoryInfo.name}
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4 whitespace-pre-wrap">
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
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 active:scale-95 ${
            copied
              ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
              : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-md'
          }`}
          title="Копировать промпт"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 animate-bounce" />
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
          onClick={handleEdit}
          className="p-2.5 bg-white/10 text-white hover:bg-gold/20 hover:text-gold rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md hover:shadow-gold/20"
          title="Редактировать промпт"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={handleFavorite}
          className={`p-2.5 rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md ${
            prompt.isFavorite
              ? 'bg-gold/20 text-gold hover:bg-gold/30 shadow-lg shadow-gold/20'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={prompt.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Star className={`w-4 h-4 transition-transform duration-200 ${prompt.isFavorite ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
        </button>

        <button
          onClick={handleDelete}
          className="p-2.5 bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200 active:scale-95 hover:shadow-md hover:shadow-red-500/20"
          title="Удалить промпт"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PromptCard
