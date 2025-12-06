import { useState } from 'react'

export function useRowColors() {
  const [showColors, setShowColors] = useState<boolean>(false)

  const toggleShowColors = () => {
    setShowColors(!showColors)
  }

  return { showColors, toggleShowColors }
}