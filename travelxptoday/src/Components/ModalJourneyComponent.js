import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";

function ModalJourneyComponent() {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        destination: '',
        startLocation: '',
        description: '',
        travelers: ['', ''],  // Initialized with two travelers as placeholders
        // Add other fields as needed
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation example - enhance as needed
        if (formData.startDate && formData.endDate && formData.destination && formData.startLocation && formData.description) {
            console.log('Form data is valid:', formData);
            // TODO: Handle form submission, like sending the data to your API
        } else {
            console.log('Please fill in all required fields.');
            // TODO: Handle form validation failure, like showing an error message to the user
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTravelerChange = (index, value) => {
        const newTravelers = [...formData.travelers];
        newTravelers[index] = value;
        setFormData(prev => ({ ...prev, travelers: newTravelers }));
    };

    return (
      <Card color="white" shadow>
        <div className="p-8">
          <Typography variant="h4" color="blue-gray">
            Create a Journey
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter the details of your journey.
          </Typography>
  
          <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input 
                type="date"
                size="lg"
                label="Start Date"
                name="startDate"
                onChange={handleInputChange}
                required
              />
              <Input 
                type="date"
                size="lg"
                label="End Date"
                name="endDate"
                onChange={handleInputChange}
                required
              />
              <Input 
                size="lg"
                label="Destination"
                name="destination"
                onChange={handleInputChange}
                required
              />
              <Input 
                size="lg"
                label="Start Location"
                name="startLocation"
                onChange={handleInputChange}
                required
              />
              <div className="col-span-2">
                <Textarea 
                  label="Description"
                  name="description"
                  placeholder="Describe your journey..."
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
  
            {/* Upload Images Section - Ensure to handle the file uploads appropriately */}
            {/* ... (This part remains the same) */}
  
            <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {formData.travelers.map((traveler, index) => (
                <Input 
                  key={index}
                  size="lg"
                  label={`Traveler ${index + 1}`}
                  placeholder="Name"
                  value={traveler}
                  onChange={(e) => handleTravelerChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
  
            <Button type="submit" className="mt-6" fullWidth color="blue">
              Create Journey
            </Button>
          </form>
        </div>
      </Card>
    );
}

export default ModalJourneyComponent;
