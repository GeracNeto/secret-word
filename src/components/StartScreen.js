import { useState } from 'react';
import './StartScreen.css';

// Components
import Loading from './Loading';

const StartScreen = ({ startGame }) => {

    const [loadGame, setLoadGame] = useState(false)

    const handleStartGame = () => {
        setLoadGame(true)

        startGame()
    }

    return (
        <div className='start'>
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={handleStartGame}>Começar Jogo</button>
            {loadGame && <Loading />}
        </div>
    )
}

export default StartScreen