/*
Component for displaying caroussel for each daily moment.
*/

import React, { useEffect, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { HomeIcon, CheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Progress, Typography } from "@material-tailwind/react";

const DailyMomentsComponent = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const start_date = new Date('2023-09-01'); // Vervang dit door je eigen startdatum
  const end_date = new Date('2023-09-30'); //TODO Vervang dit door je eigen einddatum
  const current_date = new Date();
  const total_duration = end_date - start_date;
  const elapsed_duration = current_date - start_date;
  const progress_percentage = (elapsed_duration / total_duration) * 100;
  const rounded_percentage = Math.round(progress_percentage * 100) / 100;
  let progress_message = '';

  if (progress_percentage < 0) {
    progress_message = 'De reis is nog niet begonnen!';
  } else if (progress_percentage > 100) {
    progress_message = 'De reis is voltooid!';
  } else {
    progress_message = `Je bent op ${rounded_percentage}% van je reis.`;
  }
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
    <div>
      <div className="w-full py-4 px-8">
        <Stepper 
        key={journeyData.id} 
        activeStep={activeStep}
        lineClassName="bg-white h-1.5"
        >
          <Step isActive={journeyData.start_time > Date.now()}>
            <HomeIcon className="h-7 w-7" />
          </Step>
          <Step
            isActive={
              journeyData.start_time < Date.now() &&
              journeyData.end_time > Date.now()
            }
          >
            <PaperAirplaneIcon className="h-7 w-7" />
          </Step>
          <Step isActive={journeyData.start_time < Date.now()}>
            <CheckIcon className="h-7 w-7" />
          </Step>
        </Stepper>
      </div>
      <div className="w-80% mx-10">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Typography className="text-pink-500" variant="h6">
            {progress_message}
          </Typography>
        </div>
        <Progress value={rounded_percentage} type color="pink" />
      </div>
      <div>
        <p>BjladjblJLBKJLKS</p>
      </div>
    </div>
  );
};

export default DailyMomentsComponent;
