import { setHours } from 'date-fns/esm';
import React, {useEffect, useState} from 'react';

function Clock() {
    const [hour, setHour] = useState();
    const [minuts, setMinuts] = useState();

    useEffect(() =>{
        setInterval(() => {
            const date = new Date();
            setMinuts(date.getMinutes());
            setHour(date.getHours())
        }, 1000)

    }, []);
    
    


    return (
        <div className='clock'>
            {hour} <br /><hr />
            {minuts}
        </div>
    );
};

export default Clock;