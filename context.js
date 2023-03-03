// context.js
import { createContext, useState } from 'react';
import axios from 'axios';

let data 
async function getData() {
    data = await axios.get('/api/get-all-tabs')
    
}

getData() 

export const MyContext = createContext();

export const MyProvider = ({ children }) => { 
  const [myState, setMyState] = useState(data); 

  return (
    <MyContext.Provider value={{ myState, setMyState }}>
      {children}
    </MyContext.Provider>
  );
};



