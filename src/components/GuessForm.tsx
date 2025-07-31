import React, { useState, ChangeEvent, FormEvent } from 'react'

interface GuessFormProps {
  onGuess: (guess: number) => void
  disabled: boolean
}

export default function GuessForm({ onGuess, disabled }: GuessFormProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const guess = parseInt(inputValue, 10)
    if (!isNaN(guess)) {
      onGuess(guess)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        required
      />
      <button type="submit" disabled={disabled}>
        Guess
      </button>
    </form>
  )
}