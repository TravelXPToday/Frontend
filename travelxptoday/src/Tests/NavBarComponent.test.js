import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/NavbarComponent";
import '@testing-library/jest-dom';

function renderNavbar() {
    render(
        <Router>
            <NavBar />
        </Router>
    );
}

beforeEach(() => {
    document.body.innerHTML = "";
});

it("Navbar journey button should navigate to the journeys page when clicked", async () => {
    renderNavbar();

    const journeyLi = screen.getByTestId("JourneyLi");

    fireEvent.click(journeyLi);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/journey");
    });
})

it("Navbar welcome button should navigate to the welcome page when clicked", async () => {
    renderNavbar();

    const homeButton = screen.getByTestId("ImageToWelcomePage");

    fireEvent.click(homeButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/");
    });
})
it("Navbar typewriter button should navigate to the welcome page when clicked", async () => {
    renderNavbar();

    const homeButton = screen.getByTestId("TypeWriterButtonToWelcomePage");

    fireEvent.click(homeButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/");
    });
})

it("Navbar hamburger journeybutton should navigate to the journeys page when clicked", async () => {
    renderNavbar();
    const hamburgerButton = screen.getByTestId("HamburgerButton");
    fireEvent.click(hamburgerButton);

    const homeButton = screen.getByTestId("HamburgerToJourneyButton");
    fireEvent.click(homeButton);

    await waitFor(() => {
        expect(window.location.pathname).toBe("/journey");
    });
})