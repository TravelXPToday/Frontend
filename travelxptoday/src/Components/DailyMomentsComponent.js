/*
Component for displaying caroussel for each daily moment.
*/

import React, { useEffect, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

const DailyMomentsComponent = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/journey/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        
        console.log(data);
        setJourneyData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-lg p-2 bg-pink-500 text-white text-2xl">
          Loading...
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    
    <div className="w-full py-4 px-8">
      {journeyData.slice(0, 1).map((journey) =>
      journey.days.map((day) => (
        <div key={day.dayNumer} className="">
          <p>{day.dayNumber}</p>
          </div>
      ))
    )}
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
        
      </Stepper>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DailyMomentsComponent;
