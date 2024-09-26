import { useState } from 'react'
import './App.css'

function Button({headingText, btnText, onClick, display = "block", height = 80, width = 100, isEnd }) {
  const buttonStyle = {
    display: display,
    height: height + 'px',
    width: width + '%',
  };

  if(isEnd){
    btnText = "Start over";
    headingText = 'You won';
  } else {
    btnText = "Restart";
    headingText = 'Game over';
  };

  return (
    <div>
      <h1>{headingText}</h1>
      <button onClick={onClick} style={buttonStyle}>
        {btnText}
      </button>
    </div>
  );
  
}

function App() {
  const languages = ["C", "C++", "JS", "Java", "Python", "PHP", "Ruby", ".NET", "C#", "Swift"];

  const [count, setCount] = useState(0);
  const [bestCount, setBestCount] = useState(0);
  const [list, setList] = useState(languages);
  const [clicked, setClicked] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isEnd, setEnd] = useState(false);

  const handleItemClick = (name) => {
    setClicked((prevClicked) => {
      if (prevClicked.includes(name)) {
        if(bestCount < count) {setBestCount(count);} else {}
        setCount(0);
        setActive(false);
        return []
      } else {
        const updatedClicked = [...prevClicked, name];
        if (updatedClicked.length === 10) { 
          setEnd(true);       
          setActive(false);   
        }
        return updatedClicked;
      }
    });
  };

  function shuffle(name) {
    setCount((count) => count + 1);
    setList((prevList) => [...prevList].sort(() => Math.random() - 0.5));
    handleItemClick(name);
  }

  function startOver() {
    setEnd(false);       
    setActive(true);  
    if(count === 10){
      setCount(0);
    }
  }

  return (
    <>
      <div className={isActive ? 'game' : 'hidden'}>
        <h1>Memory Cards</h1>
        <div className="gameText">
          <div className='instr'>Earn points by clicking on language cards, but you can only click each card once.</div>
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

      <div className={ !isActive ? 'gameOver' : 'hidden' }> 
        <div className={isEnd ? null : 'hidden'}> 
            <div className="scoreDiv">Count is {count}</div>
        </div>  
        <Button onClick={() => startOver()} isEnd={isEnd} />
      </div>
    </>
  )
}

export default App
