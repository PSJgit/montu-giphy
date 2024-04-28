import { useState, useEffect } from "react"
import axios from "axios"
import config from "../config"
import { GifData } from "./types/GiphyData"
import InfiniteScroll from "./components/InfiniteScroll"
import "./App.css"

type Mode = "trending" | "search"

const App: React.FC = () => {
  const [gifs, setGifs] = useState<GifData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [viewMode, setViewMode] = useState<Mode>("trending")
  const limit = 20

  const fetchGifs = async () => {
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

      setGifs((prevGifs) => {
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

  useEffect(() => {
    fetchGifs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("gifs", gifs)
  console.log("offset", offset)

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setViewMode(e.currentTarget.name as Mode)
  }
  return (
    <>
      <h1 className="main-heading">Montu Giphy Tech Test</h1>
      <div className="view-mode-container">
        <button name="trending" onClick={handleViewChange}>
          Trending
        </button>
        <button name="search" onClick={handleViewChange}>
          Search
        </button>
      </div>

      {viewMode === "trending" ? (
        <InfiniteScroll gifs={gifs} loading={loading} fetchGifs={fetchGifs} />
      ) : viewMode === "search" ? (
        <>search</>
      ) : null}
    </>
  )
}

export default App
