
import React, { useState, useEffect } from 'react';
function Traveller(){
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/traveler/all')
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error(error));
      }, []);
    
      return (
        <div>
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
        </div>
        )};

export default Traveller







//   console.log("send")
//     fetch("http://127.0.0.1:5000/traveler/all").then(response => response.json()).then(data => {
//         document.getElementById("Traveller").innerHTML = JSON.stringify(data);