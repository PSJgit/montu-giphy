import { useState, useEffect } from "react"
import axios from "axios"
import config from "../config"
import { GifData } from "./types/GiphyData"
import InfiniteScroll from "./components/InfiniteScroll"
import Search from "./components/Search"
import "./App.css"

type Mode = "trending" | "search"

const App: React.FC = () => {
  const [trendingGifs, setTrendingGifs] = useState<GifData[]>([])
  const [searchGifs, setSearchGifs] = useState<GifData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [viewMode, setViewMode] = useState<Mode>("trending")
  const limit = 20

  // trending and search functions have some similarity, potential to merge into one function
  // lengthy/duplicative but readable currently
  const fetchTrendingGifs = async () => {
    if (loading) return
    setLoading(true)

    try {
      // using axios but could be native fetch
      const response = await axios.get(config.giphy.trendingEndpoint, {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API,
          limit: limit,
          offset: offset,
        },
      })

      const {
        data: { data: newGifs },
      } = response

      setTrendingGifs((prevGifs) => {
        // prevent issues with react strict mode (double render)
        // in dev (only an issue as we're infinite scrolling/fetching)
        if (offset === 0) {
          return [...newGifs]
        }

        // seen instances of duplicate gifs, filter out for now, investigate if time
        const uniqueNewGifs = newGifs.filter(
          (gif: GifData) =>
            !prevGifs.some((existingGif) => existingGif.id === gif.id)
        )

        return [...prevGifs, ...uniqueNewGifs]
      })

      setOffset((prevOffset) => prevOffset + limit)
    } catch (error) {
      console.error("Error fetching GIFs:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSearchGifs = async (query: string) => {
    if (loading || !query) return
    setLoading(true)
    try {
      const response = await axios.get(config.giphy.searchEndpoint, {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API,
          limit: 50,
          offset: 0,
          q: query,
        },
      })

      setSearchGifs(response.data.data)
    } catch (error) {
      console.error("Error fetching GIFs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingGifs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setViewMode(e.currentTarget.name as Mode)
  }
  return (
    <>
      <h1 className="main-heading">Montu Giphy Tech Test</h1>
      <div className="view-mode-container">
        <button
          name="trending"
          className="trending-btn"
          onClick={handleViewChange}
        >
          Trending
        </button>
        <button name="search" className="search-btn" onClick={handleViewChange}>
          Search
        </button>
      </div>

      {viewMode === "trending" ? (
        <InfiniteScroll
          trendingGifs={trendingGifs}
          loading={loading}
          fetchTrendingGifs={fetchTrendingGifs}
        />
      ) : viewMode === "search" ? (
        <Search fetchSearchGifs={fetchSearchGifs} searchGifs={searchGifs} />
      ) : null}
    </>
  )
}

export default App
