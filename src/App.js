// CSS
import './App.css';

// React
import { useState } from 'react';

// data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

function App() {

  // States
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  // Generates the category and word randomly
  const pickWordandCategory = () => {

    // Pick a ramdom category
    const categories = Object.keys(words) // Cria uma array contendo as chaves do obejto wordsList
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] // Armazena uma das chaves do objeto wordsList -> É gerado um número aleatório dentro do tamanho da lista como indice do array
    //console.log(category)

    // Pick a romdom word
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)] // Armaznea uma palavra da categoria de forma aleatória
    //console.log(word)

    return { word, category }
  }

  // Starts the secret word game
  const startGame = () => {

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
    setGameStage(stages[1].name)
  }

  // Process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  // Restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retry={retry} />}

    </div>
  );
}

export default App;
