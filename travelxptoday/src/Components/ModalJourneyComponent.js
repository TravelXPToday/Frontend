
import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { API_BASE_URL } from '../Config';
import ReactSelect from 'react-select';
function ModalJourneyComponent({ refresh, onSubmit, useInitialData = false }) {
  const [travelers, setTravelers] = useState([]);
  const [selectedTraveler, setSelectedTraveler] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/traveler/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTravelers(data);
        if (data.length > 0) {
          setSelectedTraveler(data[0].Email);
        }
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    };
    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);

  // const initialTravelers = useInitialData ? [
  //   {
  //     "name": "Art",
  //     "email": "test@gmail"
  //   },
  //   {
  //     "name": "Jelle",
  //     "email": "Test@gmail.com"
  //   }
  // ] : [];
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    destination: '',
    startLocation: '',
    description: '',
    travelers: [],
    transportation: '',
    days: [
      {
        day: '1',
        dailyMoments: [
          ['moment1A', 'moment1B'],
          ['moment2A', 'moment2B']
        ]
      },
      {
        day: '2',
        dailyMoments: [
          ['moment3A', 'moment3B'],
          ['moment4A', 'moment4B']
        ]
      },

    ],
    image_url: "https://picsum.photos/480/300"

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTravelerChange = (index, value) => {
    const newTravelers = [...formData.travelers];
    newTravelers[index].name = value;
    setFormData(prev => ({ ...prev, travelers: newTravelers }));
  };
  const handleRemoveTraveler = (emailToRemove) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      travelers: prevFormData.travelers.filter(traveler => traveler.email !== emailToRemove)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(e, formData);
      return;
    }

    if (isNaN(Date.parse(formData.startDate)) || isNaN(Date.parse(formData.endDate))) {
      console.error('Invalid date format');
      alert('Invalid date format');
      setLoading(false);
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      console.error('End date must be after start date');
      alert('End date must be after start date');
      setLoading(false);
      return;
    }

    if (typeof formData.destination !== 'string' || formData.destination.trim() === '') {
      console.error('Destination must be a non-empty string');
      alert('Destination must be a non-empty string');
      setLoading(false);
      return;
    }
    if (typeof formData.name !== 'string' || formData.name.trim() === '') {
      console.error('name must be a non-empty string');
      alert('The name must be a non-empty string');
      setLoading(false);
      return;
    }
    if (typeof formData.startLocation !== 'string' || formData.startLocation.trim() === '') {
      console.error('Start location must be a non-empty string');
      alert('Start location must be a non-empty string');
      setLoading(false);
      return;
    }

    if (typeof formData.description !== 'string' || formData.description.trim() === '') {
      console.error('Description must be a non-empty string');
      alert('Description must be a non-empty string');
      setLoading(false);
      return;
    }
    if (typeof formData.transportation !== 'string' || formData.transportation.trim() === '') {
      console.error('Transportation must be a non-empty string');
      alert('Transportation must be a non-empty string');
      setLoading(false);
      return;
    }

    if (!Array.isArray(formData.travelers) ||
      formData.travelers.some(traveler =>
        typeof traveler.name !== 'string' ||
        traveler.name.trim() === '' ||
        typeof traveler.email !== 'string' ||
        traveler.email.trim() === ''
      )) {
      console.error('Each traveler must have a non-empty name and email');
      alert('Each traveler must have a non-empty name and email');
      setLoading(false);
      return;
    }


    if (formData.startDate && formData.endDate && formData.destination && formData.startLocation && formData.description && formData.travelers && formData.transportation) {


      try {
        const response = await fetch('http://127.0.0.1:5000/journey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }


        refresh();
      } catch (error) {

      } finally {
        setLoading(false);

      }
    } else {
      setLoading(false);

    }
  };



  return (
    <div >
      {loading && <p>Loading...</p>}  {/* Simple loading indicator */}

      <Typography variant="h4" color="blue-gray-900">
        Create a Journey
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter the details of your journey.
      </Typography>

      <form className="mt-8 mb-2 max-w-screen-lg  " onSubmit={handleSubmit} noValidate >
        <div className="mb-4 flex flex-wrap justify-between">
          <div className='mb-4 w-full'>
            <Input
              className='focus:bg-teal-100 w-full'
              type="text"
              size="lg"
              label="Name"
              name="name"
              onChange={handleInputChange}
              data-testid="name"
              required
            />

          </div>
          <div className="flex mb-2  w-full gap-2 flex-wrap">
            <Input
              className='focus:bg-teal-100 '
              type="date"
              size="lg"
              label="Start Date"
              name="startDate"
              onChange={handleInputChange}

              required

              data-testid="startDate"

            />
            <Input
              className='focus:bg-teal-100 '
              type="date"
              size="lg"
              label="End Date"
              name="endDate"
              onChange={handleInputChange}
              required

              data-testid="endDate"
            />
          </div>
          <div className="flex mb-4  gap-2 flex-auto flex-wrap ">
            <Input
              className='focus:bg-teal-100 '
              size="lg"
              label="Start Location"
              name="startLocation"
              onChange={handleInputChange}
              required
              data-testid="startLocation"

            />
            <Input
              className='focus:bg-teal-100 '
              size="lg"
              label="Destination"
              name="destination"
              onChange={handleInputChange}

              required
              data-testid="destination"
            />
          </div>
          <div className='mb-2 w-full '>
            <Input
              className='focus:bg-teal-100 w-full'
              size="lg"
              label="Mode of Transportation"
              name="transportation"
              onChange={handleInputChange}
              data-testid="transportation"
              required
            />
          </div>
          <div className='w-full'>
            <Textarea
              className='focus:bg-teal-100 w-full'
              label="Description"
              name="description"
              onChange={handleInputChange}
              data-testid="description"


            />
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <ReactSelect
            value={travelers.find(t => t.Email === selectedTraveler)}
            onChange={(option) => setSelectedTraveler(option.Email)}
            getOptionLabel={(option) => option.Username}
            getOptionValue={(option) => option.Email}
            options={travelers}
            placeholder="Select Traveler"
            className="text-gray-700 leading-tight"
          />

          <button onClick={() => {
            const travelerToAdd = travelers.find(t => t.Email === selectedTraveler);
            if (travelerToAdd && !formData.travelers.some(t => t.email === travelerToAdd.Email)) {
              setFormData({
                ...formData,
                travelers: [...formData.travelers, { username: travelerToAdd.Username, email: travelerToAdd.Email }]
              });
            }
          }}
            className="mt-6 mb-2 bg-pink-500 rounded-full text-white p-2 hover:border-1 hover:border-pink-500 hover:text-pink-500 hover:bg-teal-900"
            type='button'
          >Add Traveler</button>

          {formData.travelers && formData.travelers.length > 0 ? (
            formData.travelers.map((traveler, index) => (
              <div key={traveler.email} className="flex gap-x-2 flex-row items-center md:w-full mb-2">
                <Input
                  className='focus:bg-teal-100'
                  size="lg"
                  label={`Traveler ${index + 1}`}
                  value={traveler.username}
                  onChange={(e) => handleTravelerChange(index, e.target.value)}
                  required
                  data-testid={`traveler-${index}`}
                />
                <button
                  type='button'
                  className="bg-teal-500 rounded-full text-white p-1 hover:bg-pink-500 px-3 "
                  onClick={() => handleRemoveTraveler(traveler.email)}
                >
                  X
                </button>
              </div>
            ))
          ) : null}
        </div>





        <Button
          type="submit"
          className="  mt-6 bg-pink-500 rounded-full text-white p-2 hover:border-1 hover:border-pink-500 hover:text-white hover:bg-teal-900 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          // group-invalid:pointer-events-none group-invalid:opacity-30
          fullWidth

        >
          Create Journey
        </Button>
      </form>
    </div>


  );
}

export default ModalJourneyComponent;
