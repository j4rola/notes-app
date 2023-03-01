// pages/_app.js
import { useState, useEffect } from 'react';
import { MyProvider } from '../context';
import axios from 'axios'; 

function MyApp({ Component, pageProps }) {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/get-all-tabs')
      console.log(`the result ${result}`)
      setData(result);
    };
    fetchData();
    console.log('hello from app.js')
  }, []);

  return (
    <MyProvider value={data}>
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default MyApp;  

