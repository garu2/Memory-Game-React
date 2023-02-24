import { getImages } from '../helpers/getImages';
import confetti from "canvas-confetti";
import { useEffect, useState } from 'react';

let res = 3;
let clicks = 0;

const Cards = ({ begin, score }) => {
    
    //const [score, setScore] = useState(0); 
    const [images, setImages] = useState(getImages(res));
    const [guessed, setGessed] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if(selected.length === 2){
          if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
            setGessed(guessed=>guessed.concat(selected))
          }
          setTimeout(()=>{
            setSelected([])
          }, 500)
        }
      }, [selected])
    
      useEffect(() =>{
        if (guessed.length === images.length) {
          
          console.log('clicks: ', clicks);
          calculateScore();
          console.log('score: ', score);
          res = res + 2;
          clearArrays()
          setImages(getImages(res))
    
          confetti({
            particleCount: 200,
            startVelocity: 30,
            spread: 300,
            gravity: 1.2,
            origin: { y: 0 },
          });
        }
      }, [guessed])
    
      const calculateScore = () => {
        const passLevel = res * 10;
        console.log('score1: ', score);
        const cards = res * 2;
        if (cards === clicks) {
          //setScore(value => value + (cards*2) + passLevel)
          score.current =  score.current + (cards*2) + passLevel
        } else if(clicks > cards && clicks < cards + 5) {
          //setScore(value => value + cards + passLevel)
          score.current = score.current + cards + passLevel;
        } else if (clicks > cards + 5 && clicks < cards + 10){
          //setScore(value => value + cards/2 + passLevel)
          score.current = score.current + cards/2 + passLevel
        }else {
          //setScore(value => value + Math.round(cards/3) + passLevel)
          score.current = score.current + Math.round(cards/3) + passLevel
        }
        clicks = 0;
      }
      useEffect(() => {
        if (begin === false) {
            clearArrays();
            res = 3;
            setImages(getImages(res))
            console.log('enter heree');
        }
      }, [begin])
    
      const clearArrays = () => {
        setGessed([])
        setSelected([])
      }
    
    const handleClick = (item) => {
        if (begin) {
            clicks = clicks + 1;
            if (selected.length < 3) {
              setSelected(selected => selected.concat(item))
            }
        } else {
            
        }
       
    }
    let include = false;

    return (
        <div className='cards'>
        <h2>Score: {score.current}</h2>
        <ul>
        {
          images.map((item, index) => (
            <li key={item} onClick={() => handleClick(item)}>
              <div className="content">
                { 
                include = selected.includes(item) || guessed.includes(item)
                //res= true
                
                }
                <div className={`front ${include?"flip-front":""}`}>
                  <img src="/question.png" alt="icon" />
                </div>
                <div className={`back ${include?"flip-back":""}`}>
                  <img src={include?item.split("|")[1]:"/question.png"} alt="icon" /> 
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      </div>
    );
}
 
export default Cards;