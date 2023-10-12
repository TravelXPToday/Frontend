import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { screen, render } from "@testing-library/react"; // Combined imports here
import AllJourneysComponent from "../Components/AllJourneysComponent"; // Import the component you want to test here
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// it("fetches and renders journey data", async () => {
//   const fakeJourneys = [
//     {
//       _id: '1',
//       name: 'Journey 1',
//       description: 'Description 1',
//     },
//     {
//       _id: '2',
//       name: 'Journey 2',
//       description: 'Description 2',
//     }

//   ];

//   jest.spyOn(global, "fetch").mockImplementation(() =>
//   Promise.resolve({
//     ok: false,
//     status: 500,
//     json: () => Promise.resolve({ error: 'Internal Server Error' }),
//   })
// );

// render(<AllJourneysComponent />, { container });

// const errorMessage = await screen.findByText(/error/i); 
// expect(errorMessage).toBeInTheDocument();

// global.fetch.mockRestore();
// });

it('displays loading state initially', () => {
  render(<AllJourneysComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

