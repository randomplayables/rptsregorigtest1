import React from 'react'
import GuessForm from './components/GuessForm'
import GuessResult from './components/GuessResult'
import GuessHistory from './components/GuessHistory'
import PrimeDisplay from './components/PrimeDisplay'
import usePrimeGame from './hooks/usePrimeGame'

function App(): JSX.Element {
  const { guesses, isGameOver, targetPrime, handleGuess, resetGame } = usePrimeGame()
  const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null

  return (
    <div>
      <h1>Prime Number Guessing Game</h1>
      {!isGameOver && <GuessForm onGuess={handleGuess} disabled={isGameOver} />}
      {lastGuess && <GuessResult result={lastGuess.result} />}
      <GuessHistory guesses={guesses} />
      {isGameOver && (
        <>
          <PrimeDisplay prime={targetPrime} />
          <button onClick={resetGame}>New Game</button>
        </>
      )}
    </div>
  )
}

export default App