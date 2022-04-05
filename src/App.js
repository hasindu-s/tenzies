import React from "react";
import Text from "./components/Text";
import Die from "./components/Die";
import Button from "./components/Button";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

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
  
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allEqual = dice.every(die => die.value === dice[0].value);
    setTenzies(allEqual && allHeld? true : false);
  }, [dice]);

  function holdDice(id) {
    if (!tenzies) {
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

  function buttonClick() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice(prevDice => prevDice.map(die => ({
          ...die,
          value: die.isHeld? die.value : getRandomValue()
        })
      ));
    }
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
      </div>
    </div>
  );
}

export default App;
