import React from 'react'

interface PrimeDisplayProps {
  prime: number
}

export default function PrimeDisplay({ prime }: PrimeDisplayProps): JSX.Element {
  return <div className="prime-display">The correct prime number was: {prime}</div>
}