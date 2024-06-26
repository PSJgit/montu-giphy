import { useEffect } from "react"
import { GifData } from "../types/GiphyData"
import { useInView } from "react-intersection-observer" // used a lib for the intersection observer for speed of use
import GifItem from "./GifItem"

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
      {/* Grid is pretty basic, would like to have made a masonry grid like giphy itself but not enough time */}
      <div className="gif-grid gif-trending">
        {trendingGifs.map((gif) => (
          <GifItem gif={gif} key={gif.id} />
        ))}
      </div>

      {/* intersection observer to load more gifs */}
      <div ref={ref} className="load-more-marker">
        <p> {loading ? "Loading..." : "Scroll down to load more"}</p>
      </div>
    </>
  )
}

export default InfiniteScroll
