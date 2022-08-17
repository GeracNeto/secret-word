import './GameOver.css'

const GameOver = ({ retry, score, lastWord }) => {

    return (
        <div className='game-over'>
            <h1>Fim do jogo!</h1>
            <h2>A sua pontuação foi: <span id='score'>{score}</span></h2>
            <h2>Palavra de eliminação: <span id='word-elimitation'>{lastWord}</span></h2>
            <button onClick={retry}>Resetar jogo</button>
        </div>
    )
}

export default GameOver
