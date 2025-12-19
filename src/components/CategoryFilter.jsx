function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 ${
            activeCategory === category.id
              ? 'bg-gradient-to-r from-gold to-yellow-400 text-dark-blue shadow-lg shadow-gold/30 scale-105'
              : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
