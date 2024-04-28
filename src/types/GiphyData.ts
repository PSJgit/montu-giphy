// fed the data from https://developers.giphy.com/docs/api/schema/ to chat gpt to generate types

// Subtype for Images, containing various formats and sizes
interface ImageVariant {
  url: string
  height: string
  width: string
  size?: string
  mp4?: string
  mp4_size?: string
  webp?: string
  webp_size?: string
}

// Main type for GIF data
export interface GifData {
  type: string // Default: "gif"
  id: string // Unique ID for the GIF
  slug: string // Slug used in the GIF's URL
  url: string // Unique URL for the GIF
  bitly_url: string // Shortened bit.ly URL
  embed_url: string // URL used for embedding the GIF
  username: string // Username attached to this GIF
  source: string // Source page for this GIF
  rating: string // MPAA-style rating for the content (e.g., "g")
  content_url?: string // Currently unused
  source_tld: string // Top-level domain of the source URL
  source_post_url: string // URL of the webpage where the GIF was found
  update_datetime: string // Last update date
  create_datetime: string // Date added to the GIPHY database
  import_datetime: string // Creation or upload date from the GIF's source
  trending_datetime: string // Trending date, if applicable
  images: { [key: string]: ImageVariant } // Various available formats and sizes
  title: string // Title that appears on giphy.com for this GIF
  alt_text: string // Alt text for assistive programs
}
