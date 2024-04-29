import { useState } from "react"
import { GifData } from "../types/GiphyData"

type Props = {
  gif: GifData
}
const colorPalette = [
  "#FF5733", // Red-orange
  "#33FF57", // Lime green
  "#3357FF", // Bright blue
  "#FF33FF", // Fuchsia
  "#FFBD33", // Yellow-orange
  "#33FFFF", // Aqua
]

const chooseRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)]
}

const GifItem: React.FC<Props> = ({ gif }) => {
  const [isLoading, setIsLoading] = useState(true)
  const backgroundColor = chooseRandomColor()
  console.log("backgroundColor", backgroundColor)
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div
      className="gif-item"
      style={{ background: isLoading ? backgroundColor : "" }}
    >
      <img
        src={gif.images.fixed_height.url}
        alt={gif.id}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  )
}

export default GifItem
