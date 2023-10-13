
import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import AllJourneysComponent, { refresh } from "../Components/AllJourneysComponent";
import { BrowserRouter } from "react-router-dom";


beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should refresh the page after 200ms', () => {
  jest.useFakeTimers();
  const { location } = window;
  delete window.location;
  window.location = { ...location, reload: jest.fn() };
  render(<AllJourneysComponent />);
  refresh();
  jest.advanceTimersByTime(200);
  expect(window.location.reload).toHaveBeenCalled();
  window.location = location; 
});

it('opens the modal when the "New" button is clicked', async () => {
  render(<AllJourneysComponent />);
  const newButton = await screen.findByText('New');
  fireEvent.click(newButton);

  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();

  const modalTitle = within(modal).getByText('Create Journey');
  expect(modalTitle).toBeInTheDocument();
});

it('displays loading state initially', () => {
  render(<AllJourneysComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('displays error message when fetch call fails', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('API is down'));
  render(<AllJourneysComponent />);
  await screen.findByText('Error:');
});

it('displays no journeys message when there are no journeys to display', async () => {
  render(<AllJourneysComponent />);
  await screen.findByText('No journeys to display');
});

it('renders the create new journey button', async () => {
  render(<AllJourneysComponent />);
  const button = await screen.findByText('Create New Journey');
  expect(button).toBeInTheDocument();
});

it('renders the fixed bottom right button with text New', async () => {
  render(<AllJourneysComponent />);
  const button = await screen.findByText('New');
  expect(button).toBeInTheDocument();
});

it('sets the journey data correctly', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          _id: "1",
          name: "Test trip",
          date: "2023-10-25",
          start_time: "2023-10-25",
          end_time: "2023-10-29",
          location: "Germany",
          description: "Road trip across the country to Germany with a group of friends.",
          image_url: "https://images.unsplash.com/photo-1695638327343-f204623e1f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
          travelers: [
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" }
          ]
        },
        {
          _id: "1",
          name: "Trip Test",
          date: "2023-10-25",
          start_time: "2023-10-25",
          end_time: "2023-10-29",
          location: "Germany",
          description: "Road trip across the country to Germany with a group of friends.",
          image_url: "https://images.unsplash.com/photo-1695638327343-f204623e1f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
          travelers: [
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" }
          ]
        }
      ])
    })
  );

  render(<BrowserRouter><AllJourneysComponent /></BrowserRouter>);

  const journeyName = await screen.findByText('Test trip');
  const journeyName2 = await screen.findByText('Trip Test');
  expect(journeyName).toBeInTheDocument();
  expect(journeyName2).toBeInTheDocument();

});
