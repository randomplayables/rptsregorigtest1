import { useState, useEffect } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'

type GuessResult = 'low' | 'high' | 'correct'

interface Guess {
  value: number
  result: GuessResult
}

interface UsePrimeGameReturn {
  guesses: Guess[]
  isGameOver: boolean
  targetPrime: number
  handleGuess: (guess: number) => void
  resetGame: () => void
}

function isPrime(num: number): boolean {
  if (num < 2) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

function generateRandomPrime(min: number, max: number): number {
  const primes: number[] = []
  for (let i = min; i <= max; i++) {
    if (isPrime(i)) {
      primes.push(i)
    }
  }
  if (primes.length === 0) {
    throw new Error('No primes in range')
  }
  const index = Math.floor(Math.random() * primes.length)
  return primes[index]
}

export default function usePrimeGame(): UsePrimeGameReturn {
  const [targetPrime, setTargetPrime] = useState<number>(() => generateRandomPrime(2, 100))
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    let isMounted = true
    initGameSession().then((data) => {
      if (isMounted && data.sessionId) {
        setSessionId(data.sessionId)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const handleGuess = (value: number) => {
    if (isGameOver) return
    let result: GuessResult
    if (value < targetPrime) {
      result = 'low'
    } else if (value > targetPrime) {
      result = 'high'
    } else {
      result = 'correct'
    }
    const newGuess: Guess = { value, result }
    const newGuesses = [...guesses, newGuess]
    setGuesses(newGuesses)
    const roundNumber = newGuesses.length
    saveGameData(sessionId, roundNumber, newGuess)
    if (result === 'correct') {
      setIsGameOver(true)
    }
  }

  const resetGame = () => {
    const newPrime = generateRandomPrime(2, 100)
    setTargetPrime(newPrime)
    setGuesses([])
    setIsGameOver(false)
  }

  return {
    guesses,
    isGameOver,
    targetPrime,
    handleGuess,
    resetGame
  }
}