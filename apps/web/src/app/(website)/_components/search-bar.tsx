'use client'

import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (value: string) => void
  placeholder?: string
  initialValue?: string
}

export function SearchBar({
  onSearch,
  placeholder = 'Search restaurants, cuisines, neighborhoods...',
  initialValue = '',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setValue(v)
    onSearch(v)
  }

  function handleClear() {
    setValue('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="h-4 w-4 text-[#8B949E]" />
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-[#161B22] border border-[#30363D] rounded-xl pl-10 pr-10 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-colors min-h-[44px]"
        aria-label="Search venues"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#E6EDF3] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
