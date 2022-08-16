// CSS
import './Game.css'

// React
import { useRef, useState } from 'react'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

    const [letter, setLetter] = useState('')

    const letterInputRef = useRef(null) // Referência

    // Função chamada quando o formulário é enviado (clicaado no botão 'jogar')
    const handleSubmit = (e) => {

        e.preventDefault() // Faz com que a página não recarregue

        verifyLetter(letter) // Faz a verificação da letra

        setLetter('') // Limpa o input

        letterInputRef.current.focus() // Foca no elemento input após clicar em 'Jogar'
    }

    return (
        <div className='game'>
            <p className='points'>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className='tip'>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentaiva(s).</p>
            <div className="wordContainer">
                {letters.map((letter, i) => guessedLetters.includes(letter) ? (
                    <span key={i} className='letter'>{letter}</span>
                ) : (
                    <span key={i} className="blankSquare"></span>
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='letter' maxLength='1' required autoFocus onChange={e => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersConatiner">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game