import { useState, useRef } from 'react'

import Cards from './components/Cards'
import Timer from './components/Timer'
import Ranking from './components/Ranking'
import './App.css'

import { supabase } from './helpers/supabaseClient'

function App() {
  const [start, setStart] = useState(false)
  const [save, setSave] = useState(false)
  const [name, setName] = useState('')
  const [warning, setWarning] = useState(false)
  const [error, setError] = useState(false)
  const score = useRef(0)

  const handleSave = async () => {
    if (name !== "") {
      
      const error = await supabase
        .from('ranking')
        .insert({ name: name, score: score.current })

      error.status === 409 ? setError(true) : location.reload()
      console.log(error);
      setWarning(false)
    }else {
      setWarning(true)
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Timer start={start} setStart={setStart} setSave={setSave}/>
      <div className="buttons">
        { !start && !save
          ?<button onClick={() => setStart(true)}>Start</button>
          :<button onClick={() => location.reload()}>Again</button>
        }
        {save &&
          <>
            <input type="text" 
              onChange={e=>setName(e.target.value)}
              className={`${warning?'warning':''}`}  
            />
            <button onClick={handleSave}>Save</button>
          </>
        }
        { error && <p className='error'>The name exist.</p> }
      </div>
      <div className="ranking">
        <Ranking/>
      </div>
      <Cards start={start} score={score}/>
    </div>
  )
}

export default App
