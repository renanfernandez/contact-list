import { useRef, useState } from 'react';
import { useContactContext } from '../context/useContextHook';
import { IContact } from '../utils/interfaces';

const Search: React.FC = () => {
  const {search, setSearch, getContacts, getSuggestions, resetSuggestions, suggestions} = useContactContext()
  const [searchText, setSearchText ] = useState<string>()
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value)
    getSuggestions(value)
  }

  const resetSearch = () => {    
    setSearchText('');
    setSearch('')
    getContacts('')
    if (searchRef.current) {
      searchRef.current.value = '';
    }    
    resetSuggestions();
  }

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(search);
    getContacts(search)
    resetSuggestions();
  }

  const handleSuggestionClick = (suggestion: IContact) => {
    setSearchText(suggestion.name);
    setSearch(suggestion.name);
    getContacts(suggestion.name);
    resetSuggestions();
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handlesubmit} className="search">
        <input className="search--input" ref={searchRef} onChange={handleSearch} placeholder="Buscar contato..." />        
      </form>
      {
        searchText && (
          <div className="search--text">
            Filtrando por {searchText} 
            <button className='search--btn' onClick={()=> resetSearch()}>x</button>
          </div>
        )
      }
      {
        suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestions--item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name} | {suggestion.phone}
              </div>
            ))}
          </div>
        )

      }
    </div>
  )
}

export default Search