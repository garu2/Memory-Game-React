import { useEffect, useState } from "react";

import { supabase } from "../helpers/supabaseClient";
import Item from "./Item";

const Ranking = () => {
    const [ranking, setRanking] = useState([])

    const callSupabase = async () => {
        const {data} = await supabase
            .from('ranking')
            .select('*')
            .order('score', { ascending: false })
        //console.log(data);
        setRanking(data)
    }
    useEffect(() => {
        callSupabase()
    }, [])

    return (
        <div className="content">
            {
                ranking &&
                ranking.map((item, index) => (
                    <Item
                        key={index}
                        name={item.name}
                        score={item.score}
                        index={index}
                    />
                ))
            }
        </div>
    );
}
 
export default Ranking;