import { tremor } from '@tremor/react'

export default {
  presets: [tremor()],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
}
