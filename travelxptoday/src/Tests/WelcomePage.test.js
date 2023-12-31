import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from "../Pages/Welcomepage";
import NavBar from "../Components/NavbarComponent";
import '@testing-library/jest-dom';


beforeEach(() => {
    document.body.innerHTML = "";
});

it("Journey button should navigate to the journeys page when clicked", async () => {
    render(
        <Router>
            <NavBar />
            <WelcomePage />
        </Router>
    );

    const journeyButton = screen.getByTestId("JourneyButton");

    fireEvent.click(journeyButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/journey");
    });
});