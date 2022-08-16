// CSS
import './App.css';

// React
import { useEffect, useState, useCallback } from 'react';

// data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// Pages
const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

//Guesses Quantity
const guesssQty = 5

function App() {

  // States
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guesssQty)
  const [score, setScore] = useState(0)

  // Generates the category and word randomly
  const pickWordandCategory = useCallback(() => {

    // Pick a ramdom category
    const categories = Object.keys(words) // Cria uma array contendo as chaves do obejto wordsList
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] // Armazena uma das chaves do objeto wordsList -> É gerado um número aleatório dentro do tamanho da lista como indice do array
    //console.log(category)

    // Pick a romdom word
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)] // Armaznea uma palavra da categoria de forma aleatória
    //console.log(word)

    return { word, category }
  }, [words])

  // Starts the secret word game
  const startGame = useCallback(() => {

    // Clear All letters
    clearLetterStages()

    // pick word and pick category
    const { word, category } = pickWordandCategory() // Destructuring 
    console.log(category, word)

    // Create an array of letters
    let wordLetters = word.split('') // Separa as letras da palavra em um array
    wordLetters = wordLetters.map(letter => letter.toLowerCase()) // Faz com que todas as letras fiquem minúsculas
    console.log(wordLetters)

    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)
    setTimeout(() => setGameStage(stages[1].name), 3000)
  }, [pickWordandCategory])

  // Process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase() // Faz com que as entradas do usuário fiquem minúsculas

    // Check if letter haas already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    // Push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters(actualGuessedLetter => [...actualGuessedLetter, normalizedLetter])
    }
    else {
      setWrongLetters(actualWrongLetter => [...actualWrongLetter, normalizedLetter])

      // Get value from previous guesses and subtracts -1 
      setGuesses(prevGuesses => prevGuesses - 1)
    }
  }

  const clearLetterStages = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Check if guesses ended
  // Whenever const guesses reach to 0, the program switches to "Game Over" page
  useEffect(() => {

    if (guesses <= 0) {

      // Reset all letters states
      clearLetterStages()

      // Swicthes to "Game Over" page
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //Check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]
    //console.log(uniqueLetters)

    // Win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // Add score
      setScore(prevScore => prevScore += 100)

      // Restart game with new word
      startGame()
    }

  }, [guessedLetters, letters, startGame, gameStage])


  //console.log(guessedLetters)
  //console.log(wrongLetters)

  // Restarts the game
  const retry = () => {

    setScore(0)
    setGuesses(guesssQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}

    </div>
  );
}

export default App;
