import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from "../Pages/Welcomepage";
import NavBar from "../Components/NavbarComponent";
import '@testing-library/jest-dom';

describe("Navigation", () => {
beforeEach(() => {
    document.body.innerHTML = ""; // Clean up the document body
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

it("Navbar Journey Button should navigate to the journeys page when clicked", async () => {
    render(
        <Router>
            <NavBar />
            <WelcomePage />
        </Router>
    );

    const journeyLi = screen.getByTestId("JourneyLi");

    fireEvent.click(journeyLi);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/journey");
    });
})});