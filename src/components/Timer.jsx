import { useState, useEffect, useRef } from "react";
//import  {countdownapi} from "react-countdown";
import Countdown from "react-countdown";

const Timer = ({ begin, setBegin, setSave}) => {
    const [time, setTime] = useState(60);
    let interval = 0;
    let te = 6;
    const clockRef = useRef();

    const Counter = ({props}) => <span>{props.seconds===0?60:props.seconds}</span>;

    useEffect(() => {
        if(begin === true){
            clockRef.current.start();
        }
    }, [begin]);
    const handleEnd = () => {
        //console.log('end timer');
        setSave(true)
        setBegin(false)
    }

    return (
        <div className="timer">
            <h3> 
                <Countdown 
                    date={Date.now() + 60000}
                    onComplete={handleEnd}
                    renderer={props =><Counter props={props}/>}
                    autoStart={false}
                    ref={clockRef}
                >
                </Countdown>
             Sec
            </h3>
        </div>
    );
}
 
export default Timer;