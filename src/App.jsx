import { useState, useEffect } from 'react'
import { Sparkles, Search as SearchIcon, Plus } from 'lucide-react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import PromptCard from './components/PromptCard'
import AddPromptModal from './components/AddPromptModal'
import ViewPromptModal from './components/ViewPromptModal'

const STORAGE_KEY = 'prompts'

const CATEGORIES = [
  { id: 'all', name: 'Все', icon: '📚' },
  { id: 'photo', name: 'Фото', icon: '📸' },
  { id: 'video', name: 'Видео', icon: '🎥' },
  { id: 'productivity', name: 'Продуктивность', icon: '⚡' },
  { id: 'text', name: 'Текст', icon: '📝' },
  { id: 'code', name: 'Код', icon: '💻' },
  { id: 'design', name: 'Дизайн', icon: '🎨' },
]

function App() {
  const [prompts, setPrompts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [viewingPrompt, setViewingPrompt] = useState(null)
  const [editingPrompt, setEditingPrompt] = useState(null)

  // Load prompts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPrompts(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading prompts from storage:', error)
    }
  }, [])

  // Save prompts to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
    } catch (error) {
      console.error('Error saving prompts to storage:', error)
    }
  }, [prompts])

  // Add new prompt
  const handleAddPrompt = (newPrompt) => {
    if (editingPrompt) {
      // Update existing prompt
      setPrompts(prev => prev.map(p =>
        p.id === editingPrompt.id ? { ...newPrompt, id: editingPrompt.id } : p
      ))
      setEditingPrompt(null)
    } else {
      // Add new prompt
      const prompt = {
        ...newPrompt,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      setPrompts(prev => [prompt, ...prev])
    }
    setIsAddModalOpen(false)
  }

  // Edit prompt
  const handleEditPrompt = (prompt) => {
    setEditingPrompt(prompt)
    setIsAddModalOpen(true)
    // Close view modal if it's open
    if (viewingPrompt?.id === prompt.id) {
      setViewingPrompt(null)
    }
  }

  // Toggle favorite
  const handleToggleFavorite = (id) => {
    setPrompts(prev => prev.map(p =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ))
  }

  // Delete prompt
  const handleDeletePrompt = (id) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
    if (viewingPrompt?.id === id) {
      setViewingPrompt(null)
    }
  }

  // Import prompts from JSON
  const handleImport = (importedPrompts) => {
    const validPrompts = importedPrompts.filter(p => p.title && p.content)
    const newPrompts = validPrompts.map(p => ({
      ...p,
      id: p.id || Date.now() + Math.random(),
      createdAt: p.createdAt || new Date().toISOString(),
      category: p.category || 'text',
      isFavorite: p.isFavorite || false,
    }))
    setPrompts(prev => [...newPrompts, ...prev])
  }

  // Filter prompts
  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get category info
  const getCategoryInfo = (categoryId) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0]
  }

  return (
    <div className="min-h-screen bg-dark-blue">
      <Header
        onAddClick={() => {
          setEditingPrompt(null)
          setIsAddModalOpen(true)
        }}
        prompts={prompts}
        onImport={handleImport}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPrompts.map((prompt, index) => (
              <div
                key={prompt.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <PromptCard
                  prompt={prompt}
                  categoryInfo={getCategoryInfo(prompt.category)}
                  onView={() => setViewingPrompt(prompt)}
                  onToggleFavorite={() => handleToggleFavorite(prompt.id)}
                  onDelete={() => handleDeletePrompt(prompt.id)}
                  onEdit={() => handleEditPrompt(prompt)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="flex flex-col items-center justify-center">
              {prompts.length === 0 ? (
                <>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-yellow-400/20 flex items-center justify-center mb-6 border border-gold/30 shadow-lg shadow-gold/20">
                    <Sparkles className="w-12 h-12 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Начните собирать промпты</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Создайте свою библиотеку лучших промптов для работы с AI
                  </p>
                  <button
                    onClick={() => {
                      setEditingPrompt(null)
                      setIsAddModalOpen(true)
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-dark-blue font-medium rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Добавить первый промпт</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                    <SearchIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Промпты не найдены</h3>
                  <p className="text-gray-400 mb-4">
                    Попробуйте изменить фильтры или поисковый запрос
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 active:scale-95"
                    >
                      Очистить поиск
                    </button>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 active:scale-95"
                    >
                      Все категории
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <AddPromptModal
          categories={CATEGORIES.filter(c => c.id !== 'all')}
          onClose={() => {
            setIsAddModalOpen(false)
            setEditingPrompt(null)
          }}
          onSave={handleAddPrompt}
          editingPrompt={editingPrompt}
        />
      )}

      {viewingPrompt && (
        <ViewPromptModal
          prompt={viewingPrompt}
          categoryInfo={getCategoryInfo(viewingPrompt.category)}
          onClose={() => setViewingPrompt(null)}
          onToggleFavorite={() => handleToggleFavorite(viewingPrompt.id)}
          onDelete={() => handleDeletePrompt(viewingPrompt.id)}
          onEdit={() => handleEditPrompt(viewingPrompt)}
        />
      )}
    </div>
  )
}

export default App
