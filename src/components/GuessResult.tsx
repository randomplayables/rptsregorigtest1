import React from 'react'

interface GuessResultProps {
  result: 'low' | 'high' | 'correct'
}

export default function GuessResult({ result }: GuessResultProps): JSX.Element {
  const messages: Record<GuessResultProps['result'], string> = {
    low: 'Too low!',
    high: 'Too high!',
    correct: 'Correct!'
  }

  return <div className={`guess-result ${result}`}>{messages[result]}</div>
}