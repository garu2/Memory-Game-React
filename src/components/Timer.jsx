import { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';

const Counter = ({props}) => <span>{props.seconds===0?60:props.seconds}</span>

const Timer = ({ start, setStart, setSave }) => {
    const timerRef = useRef();

    const handleEnd = ({ start }) => {
        console.log('timer end');
        setStart(false)
        setSave(true)
    }

    useEffect(() => {
        if (start) {
            timerRef.current.start()
        }
    }, [start])

    return (
        <div className="timer">
            <h3> 
            <Countdown
                date={Date.now() + 60000}
                renderer={props => <Counter props={props}/>}
                onComplete={handleEnd}
                autoStart={false}
                ref={timerRef}
            >
            </Countdown>
            Sec</h3>
        </div>
    );
}
 
export default Timer;