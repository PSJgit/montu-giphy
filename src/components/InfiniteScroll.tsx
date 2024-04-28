import { useEffect } from "react"
import { GifData } from "../types/GiphyData"
import { useInView } from "react-intersection-observer"

type Props = {
  gifs: GifData[]
  loading: boolean
  fetchGifs: any
}

const InfiniteScroll: React.FC<Props> = ({ gifs, loading, fetchGifs }) => {
  // Intersection Observer ref
  const { ref, inView } = useInView()
  console.log("loading", loading)

  useEffect(() => {
    if (inView && !loading) {
      fetchGifs()
    }
    // only fetch on view change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      <div className="gif-grid gif-trending">
        {gifs.map((gif) => (
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
