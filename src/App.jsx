import { useState } from 'react'
import './App.css'

function Button({headingText, btnText, onClick, display = "block", height = 80, width = 100, isEnd }) {
  const buttonStyle = {
    display: display,
    height: height + 'px',
    width: width + '%',
  };

  btnText = "Restart";

  if(isEnd){ 
    headingText = 'You won';
  } else {
    headingText = 'Game over';
  };

  return (
    <div>
      <h1>{headingText}</h1>
      <button className='restartBtn' onClick={onClick} style={buttonStyle}>
        {btnText}
      </button>
    </div>
  );
  
}

function App() {
  const languages = ["C", "C++", "JS", "Java", "Python", "PHP", "Ruby", ".NET", "C#", "Swift"];

  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [bestCount, setBestCount] = useState(0);
  const [list, setList] = useState(languages);
  const [clicked, setClicked] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isEnd, setEnd] = useState(false);

  function startGame() {
    setIsStarted(true);
  }

  const handleItemClick = (name) => {
    setClicked((prevClicked) => {
      if (prevClicked.includes(name)) {
        if(bestCount < count) {
          setBestCount(count);
        } 
        else {}

        setCount(0);
        setIsActive(false);
        return []
      } else {
        const updatedClicked = [...prevClicked, name];
        if (updatedClicked.length === 10) { 
          setEnd(true);       
          setIsActive(false);   
        }
        return updatedClicked;
      }
    });
  };

  // To change sequence after every click
  function shuffle(name) {
    setCount((count) => count + 1);
    setList((prevList) => [...prevList].sort(() => Math.random() - 0.5));
    handleItemClick(name);
  }

  function startOver() {
    setEnd(false);       
    setIsActive(true);  
    if(count === 10){
      setCount(0);
      setBestCount(0);
      setIsStarted(false);
    }
  }

  return (
    <>
      <div className={isStarted ? 'hidden' : ''}>
        <h1>Memory Cards</h1>
        <button className='startButton' onClick={() => startGame()}>
          Start
        </button>
      </div>

      <div className={isStarted ? '' : 'hidden'}>
        <div className={isActive ? 'game' : 'hidden'}>
          <h1>Memory Cards</h1> 
          <div className="gameText">
            <div className='instr'>
              Earn points by clicking on language cards, but you can only click each card once.
            </div>
            <div className="scoreDiv">
              <div>Count is {count}</div>
              <div>Best count is {bestCount}</div>
            </div>
          </div>
          <div className="card">
            {list.map((oneList, index) => {
              return(
                <button 
                key={index} 
                onClick={() => shuffle(oneList)}
                >
                  {oneList}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className={ !isActive ? 'gameOver' : 'hidden' }> 
        <div className={isEnd ? '' : 'hidden'}> 
            <div className="scoreDiv">Count is {count}</div>
        </div>  
        <Button onClick={() => startOver()} isEnd={isEnd} />
      </div>
    </>
  )
}

export default App
