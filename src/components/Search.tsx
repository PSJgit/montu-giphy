import { useState } from "react"
import { GifData } from "../types/GiphyData"

type Props = {
  fetchSearchGifs: (query: string) => Promise<void>
  searchGifs: GifData[]
}

const Search: React.FC<Props> = ({ fetchSearchGifs, searchGifs }) => {
  const [searchValue, setSearchValue] = useState<string>("")
  console.log("searchValue", searchValue)

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

      <div className="gif-grid">
        {searchGifs.map((gif) => (
          <div className="gif-item" key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
