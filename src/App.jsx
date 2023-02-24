import './App.css'
import { useState } from 'react';
import Cards from './components/Cards';

import Timer from './components/Timer';
import Ranking from './components/Ranking';
import { supabase } from './helpers/supabaseClient';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';

//import { getRanking } from './helpers/api';

function App() {
  //getRanking()
  
  const [begin, setBegin] = useState(false);
  const [save, setSave] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [warning, serWarning] = useState(false);
  //const [score, setScore] = useState(0);
  const score = useRef(0); 
  console.log("test: ", begin);

  const handleInit = () => {
    setBegin(true)
  }
  const handleAgain = () => {
    location.reload()
  }
  const handleSave = async () => {
    if (name !== "") {
      console.log('res');
      serWarning(false);
      const insert = await supabase.from('ranking').insert({ 
        name: name,
        score: score.current
      })
      insert.status === 409 ? setError(true): location.reload()
      console.log('result: ', insert.status);
      //location.reload() ¯\_(ツ)_/¯
    } else {
      serWarning(true);
    }
  }


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Timer begin={begin} setBegin={setBegin} setSave={setSave}/>
      
      <div className="buttons">
        { !begin && !save
          ? <button onClick={handleInit}>Start</button>
          : <button onClick={handleAgain}>Again</button>
        }
        { save && 
          <input type="text" onChange={e=>setName(e.target.value)} className={`${warning?"warning":""}`}/> 
        }
        {error && <p className='error'>The name exists.</p>}  
          
        { save && <button onClick={handleSave}>Save</button> }
      </div>
      <div className="ranking">
          <Ranking/>
      </div>
      <Cards 
        begin={begin}
        //setScore={setScore}
        score={score}
      />
    </div>
  )
}

export default App
