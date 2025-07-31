export type GuessResult = 'low' | 'high' | 'correct'

export interface Guess {
  value: number
  result: GuessResult
}

export interface UsePrimeGameReturn {
  guesses: Guess[]
  isGameOver: boolean
  targetPrime: number
  handleGuess: (guess: number) => void
  resetGame: () => void
}