import { useState } from "react"
import { GifData } from "../types/GiphyData"
import GifItem from "../components/GifItem"

type Props = {
  fetchSearchGifs: (query: string) => Promise<void>
  searchGifs: GifData[]
}

const Search: React.FC<Props> = ({ fetchSearchGifs, searchGifs }) => {
  const [searchValue, setSearchValue] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchSearchGifs(searchValue)
    setSearchValue("")
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          id="search-input"
          type="search"
          className="search-input"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search"
        />
        <button className="search-action" type="submit">
          Go!
        </button>
      </form>

      {searchGifs.length > 0 ? (
        <div className="gif-grid">
          {searchGifs.map((gif) => (
            <GifItem gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <p className="no-results-search">No gifs, search for some above!</p>
      )}
    </div>
  )
}

export default Search
