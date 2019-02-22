import React, { useState, useEffect } from 'react'
import moment from 'moment';

const useTimer = () => {
    const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
    useEffect(() => {
      setTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      const timer = setInterval(() => {
        setTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      }, 1000);
  
      return () => clearInterval(timer);
    },[]);

    return time;
}

export default useTimer;