import { useEffect, useState } from 'react';

import { supabase } from '../helpers/supabaseClient'
import Item from './Item';

const Ranking = () => {
    const [rankin, setRankin] = useState([]);

    const callSupabase = async () => {
        const {data} = await supabase.from('ranking').select('*').order('score', { ascending: false })
        console.log(data);
        setRankin(data);
    }
    useEffect( () => {
        callSupabase()
    }, [])

    return (
        <div className="content">
            {
                rankin && 
                rankin.map((item, index) => (
                    <Item key={index} 
                        index={index}
                        name={item.name} 
                        score={item.score}/>
                ))
            }
        </div>
    );
}
 
export default Ranking;