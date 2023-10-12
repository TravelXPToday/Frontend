import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/NavbarComponent";
import '@testing-library/jest-dom';

describe("Navbar tests", () => {
beforeEach(() => {
    document.body.innerHTML = "";
});

it("Navbar journey button should navigate to the journeys page when clicked", async () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    const journeyLi = screen.getByTestId("JourneyLi");

    fireEvent.click(journeyLi);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/journey");
    });
})});