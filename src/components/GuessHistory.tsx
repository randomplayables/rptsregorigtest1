import React from 'react'

interface GuessHistoryProps {
  guesses: {
    value: number
    result: 'low' | 'high' | 'correct'
  }[]
}

export default function GuessHistory({ guesses }: GuessHistoryProps): JSX.Element {
  return (
    <div className="guess-history">
      <ul>
        {guesses.map((guess, index) => (
          <li key={index}>
            Guess {index + 1}: {guess.value} - {guess.result === 'low' ? 'Too low!' : guess.result === 'high' ? 'Too high!' : 'Correct!'}
          </li>
        ))}
      </ul>
    </div>
  )
}