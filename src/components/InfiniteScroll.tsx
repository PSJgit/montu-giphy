import { useEffect } from "react"
import { GifData } from "../types/GiphyData"
import { useInView } from "react-intersection-observer"

type Props = {
  trendingGifs: GifData[]
  loading: boolean
  fetchTrendingGifs: () => Promise<void>
}

const InfiniteScroll: React.FC<Props> = ({
  trendingGifs,
  loading,
  fetchTrendingGifs,
}) => {
  // Intersection Observer ref
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !loading && trendingGifs) {
      fetchTrendingGifs()
    }
    // only fetch on view change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (!trendingGifs) return

  return (
    <>
      <div className="gif-grid gif-trending">
        {trendingGifs.map((gif) => (
          <div className="gif-item" key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.id} />
          </div>
        ))}
      </div>

      {/* intersection observer to load more gifs */}
      <div ref={ref} style={{ height: "50px", backgroundColor: "lightgray" }}>
        {loading ? "Loading..." : "Scroll down to load more"}
      </div>
    </>
  )
}

export default InfiniteScroll
