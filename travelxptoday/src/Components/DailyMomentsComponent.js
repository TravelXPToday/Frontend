/*
Component for displaying caroussel for each daily moment.
*/

import React, { useEffect, useState, useMemo } from "react";
import { Stepper, Step} from "@material-tailwind/react";
import { HomeIcon, CheckIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Progress, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Carousel, IconButton  } from "@material-tailwind/react";
import ScrollComponent from "./ScrollComponent";
import moment from "moment";

const DailyMoments = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [start_date, setStartDate] = useState(null); 
  const [end_date, setEndDate] = useState(null); 
  const current_date = useMemo(() => new Date(), []); //Control klik op date en dan zie je locale date, nog naar kijken
  const total_duration = end_date - start_date;
  const elapsed_duration = current_date - start_date;
  const progress_percentage = (elapsed_duration / total_duration) * 100;
  const rounded_percentage = Math.round(progress_percentage * 100) / 100;
  const [currentDate, setDate] = useState('');
  
  let progress_message = '';
  const { id } = useParams();
  const URL = `http://127.0.0.1:5000/journey/` + id;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 50,
       // Hiermee wordt de scroll-animatie ingeschakeld
    });
  };

  if (progress_percentage < 0) {
    progress_message = 'De reis is nog niet begonnen!';
  } else if (progress_percentage > 100) {
    progress_message = 'De reis is voltooid!';
  } else {
    progress_message = `Je bent op ${rounded_percentage}% van je reis.`;
  }

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJourneyData(data);
        setStartDate(new Date(data.start_time));
        setEndDate(new Date(data.end_time));
        setLoading(false);
        const newDate = moment(current_date).format('YYYY-MM-DD') //TODO
        setDate(newDate);
        if (data.start_time > currentDate) {
          setActiveStep(0); 
        } else if (data.start_time <= currentDate && data.end_time > currentDate) {
          setActiveStep(1); 
        } else {
          setActiveStep(2);
        }
        console.log(currentDate, data.start_time, data.end_time)
        console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(current_date));
        
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

  }, [URL, currentDate, current_date] );

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
      <ScrollComponent />
      <div className="w-full py-4 px-8">
        <Stepper
          key={journeyData.id}
          activeStep={activeStep}
          lineClassName="bg-white h-1.5"
        >
          <Step isActive={journeyData.start_time > current_date}>
            <HomeIcon className="h-7 w-7" />
          </Step>
          <Step
            isActive={
              journeyData.start_time <= current_date &&
              journeyData.end_time > current_date
            }
          >
            <PaperAirplaneIcon className="h-7 w-7" />
          </Step>
          <Step isActive={journeyData.start_time < current_date}>
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
        <Carousel 
        className="rounded-xl mt-4"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={() => {
              handlePrev();
              scrollToTop();
            }}
            className="!fixed bg-pink-500 hover:text-pink-500 hover:bg-white top-3/4 md:top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={() => {
              handleNext();
              scrollToTop();
            }}
            className="!fixed bg-pink-500 hover:text-pink-500 hover:bg-white top-3/4 md:top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="fixed bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}>
          
          {journeyData.days.map((day) => (
            <div className="h-auto w-full  m-auto md:w-8/12"
            key={day.dayNumber}>
              <h1 className="text-4xl font-bold mb-4 text-white">Day {day.dayNumber} on {day.date}</h1>
              <div className="flex-grow mb-8">
              {day.dailyMoments.map((dailyMoment) => (
                <div className="mb-8 snap-center">
                
                <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="1"
                className="object-cover w-full h-1/4"
              />
              <div className="bg-white rounded-b-lg h-24" key={dailyMoment.dayNumber}>
                <h1 className="font-bold">{dailyMoment.name} at {dailyMoment.location}</h1>
                {dailyMoment.description}
              
              </div>
              </div>
              ))}
            </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DailyMoments;
