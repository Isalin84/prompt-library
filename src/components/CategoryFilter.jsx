function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-gold text-dark-blue'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
