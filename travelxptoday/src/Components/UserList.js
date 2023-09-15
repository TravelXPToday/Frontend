
import React, { useState, useEffect } from 'react';
function Traveller(){
    const [data, setData] = useState(null);
    const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
    useEffect(() => {
        fetch('http://127.0.0.1:5000/traveler/all')
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error(error));
      }, []);
    
      return (
        <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
          {data.map((data) => (
            <li key={data.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={data.name} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{data.name}</h3>
                  
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
        )};

export default Traveller

