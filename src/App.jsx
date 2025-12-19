import { useState, useEffect } from 'react'
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
    const prompt = {
      ...newPrompt,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    setPrompts(prev => [prompt, ...prev])
    setIsAddModalOpen(false)
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
        onAddClick={() => setIsAddModalOpen(true)}
        prompts={prompts}
        onImport={handleImport}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                categoryInfo={getCategoryInfo(prompt.category)}
                onView={() => setViewingPrompt(prompt)}
                onToggleFavorite={() => handleToggleFavorite(prompt.id)}
                onDelete={() => handleDeletePrompt(prompt.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Промпты не найдены</p>
            <p className="text-gray-500 mt-2">
              {prompts.length === 0
                ? 'Добавьте свой первый промпт'
                : 'Попробуйте изменить фильтры'}
            </p>
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <AddPromptModal
          categories={CATEGORIES.filter(c => c.id !== 'all')}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPrompt}
        />
      )}

      {viewingPrompt && (
        <ViewPromptModal
          prompt={viewingPrompt}
          categoryInfo={getCategoryInfo(viewingPrompt.category)}
          onClose={() => setViewingPrompt(null)}
          onToggleFavorite={() => handleToggleFavorite(viewingPrompt.id)}
          onDelete={() => handleDeletePrompt(viewingPrompt.id)}
        />
      )}
    </div>
  )
}

export default App
