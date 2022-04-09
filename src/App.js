import React, {useState, useEffect} from "react";
import Text from "./components/Text";
import Die from "./components/Die";
import Button from "./components/Button";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import Modal from "./components/Modal";

function App() {

  function getRandomValue() {
    return Math.ceil(Math.random() * 6);
  }
  
  function allNewDice() {
    const values = [];
    for (let i = 0; i < 10; i++) {
      values.push({
        id: nanoid(),
        value: getRandomValue(),
        isHeld: false
      });
    }

    return values;
  }
  
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numOfRolls, setNumOfRolls] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState([]);

  function checkBestScore() {
    const initBestScore = JSON.parse(localStorage.getItem('bestScore'));

    if (!initBestScore || initBestScore >= numOfRolls) {
      localStorage.setItem('bestScore', numOfRolls);
      return numOfRolls;
    } else {
      return initBestScore;
    }
  }
  
  function computeDuration() {
    const duration = (time[time.length - 1] - time[0]) / 1000
    return duration;
  }

  function checkBestTime() {
    const initBestTime = JSON.parse(localStorage.getItem('bestTime'));
    console.log(initBestTime);
    const duration = computeDuration();

    if (!initBestTime || initBestTime >= duration) {
      localStorage.setItem('bestTime', duration);
      return duration;
    } else {
      return initBestTime;
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allEqual = dice.every(die => die.value === dice[0].value);
    
    if (allEqual && allHeld) {
      setTenzies(true);
      setShowModal(true);
    }
  }, [dice]);

  function holdDice(id) {
    if (!tenzies) {
      setTime(prevTime => [...prevTime, Date.now()]);
      setDice(prevDice => prevDice.map(die => ({
          ...die,
          isHeld: die.id === id? !die.isHeld : die.isHeld,
        })
      ));
    }
  }

  const diceElements = dice.map(die => 
    <Die 
      key={die.id}
      id={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}  
    />);

  function newGame() {
    setShowModal(false);
    setDice(allNewDice());
    setTenzies(false);
    setNumOfRolls(0);
    setTime([]);
  }
  
  function buttonClick() {
    if (tenzies) {
      setShowModal(true);
    } else {
      setDice(prevDice => prevDice.map(die => ({
          ...die,
          value: die.isHeld? die.value : getRandomValue()
        })
      ));
      setNumOfRolls(prevRolls => ++prevRolls);
    }
  }

  // hide overflow added by Confetti component
  if (tenzies) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="App">
      <div className="container">
        {tenzies && <Confetti numberOfPieces={100}/>}
        <Text />
        <div className="dice">
          {diceElements}  
        </div>
        <Button 
          click={buttonClick} 
          completed={tenzies}
        />
        {showModal &&
          <Modal
            numOfRolls={numOfRolls}
            time={computeDuration()}
            show={setShowModal}
            newGame={newGame}
            bestNumOfRolls={checkBestScore()}
            bestTime={checkBestTime()}
          />
        }
      </div>
    </div>
  );
}

export default App;
