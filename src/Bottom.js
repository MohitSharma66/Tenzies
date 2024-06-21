import React from 'react';
import './Bottom.css';
import Confetti from 'react-confetti';

export default function Bottom() {
    
    const [dice, setDice] = React.useState(generateDie())
    const [tenzies, setTenzies] = React.useState(false)
    const[roll, setRoll] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
    
        if (allHeld && allSameValue) {
            setTenzies(true);
        }

    }, [dice]);

    function generateDie() {
        const arr = []
        for(let i = 0; i < 10; i++) {
            arr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: Math.random()
            })
        }
        return arr;
    }
    
    function rollDie() {
        if(!tenzies) {
            if(roll < 10) {
                setDice(function(die) {
                    return die.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)})
                })
                setRoll(roll => roll + 1)
            }
            else {
                setDice(generateDie());
                setTenzies(false)
                setRoll(0)
                alert('You lost!!')
            }
        }
        else {
            setDice(generateDie());
            setTenzies(false)
            setRoll(0)
        }
    }

    function holdDie(id) {
        setDice(dice => dice.map(dice => dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice))
    }

    return (
        <div className='Bottom'>
            <div className='Rolls'>
                {dice.map(die => (
                    <div
                    key={die.id}
                    className={`die ${die.isHeld ? 'held' : ''}`}
                    onClick={() => holdDie(die.id)}
                    >
                        {die.value}
                    </div>
                ))}
                <button className='Button' onClick={rollDie}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
            {tenzies && <Confetti />}
            <h4>{`You have ${10-roll} tries remaining`}</h4>
        </div>
    )
}