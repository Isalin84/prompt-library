import { Search } from 'lucide-react'

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200" />
      <input
        type="text"
        placeholder="Поиск промптов..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:bg-white/15 transition-all duration-200 hover:border-white/30"
      />
    </div>
  )
}

export default SearchBar
