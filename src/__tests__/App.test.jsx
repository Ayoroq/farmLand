import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "../routes/Approute.jsx";

const renderApp = () => {
  const router = createBrowserRouter(routes);
  render(<RouterProvider router={router} />);
};

describe("App Routing", () => {
  it("renders without crashing", () => {
    renderApp();
    expect(screen.getAllByRole("navigation")[0]).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    renderApp();
    expect(screen.getByText(/farmers/i)).toBeInTheDocument();
  });

  it("navigates to shop page when shop link is clicked", async () => {
    renderApp();

    const user = userEvent.setup();
    const shopLink = screen.getAllByText(/Shop/i)[0];
    await user.click(shopLink);

    expect(screen.getByText(/Shop Our Products/i)).toBeInTheDocument();
  });

  it("navigates to about page when about link is clicked", async () => {
    renderApp();

    const user = userEvent.setup();
    const aboutLink = screen.getAllByText(/Who we are/i)[0];
    await user.click(aboutLink);

    expect(screen.getByText(/About FarmLand/i)).toBeInTheDocument();
  });

  it("navigates to contact page when contact link is clicked", async () => {
    renderApp();

    const user = userEvent.setup();
    const contactLink = screen.getAllByText(/Find Us/i)[0];
    await user.click(contactLink);

    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  it("navigates to basket page when basket link is clicked", async () => {
    renderApp();

    const user = userEvent.setup();
    const basketLink = screen.getAllByText(/Basket/i)[0];
    await user.click(basketLink);

    expect(screen.getByText(/Shopping/i)).toBeInTheDocument();
  });
});

describe("App Integration Tests", () => {
  it("maintains navbar across different routes", async () => {
    renderApp();

    const user = userEvent.setup();

    const shopLink = screen.getAllByText(/Shop/i)[0];
    await user.click(shopLink);

    expect(screen.getAllByRole("navigation")[0]).toBeInTheDocument();
  });
});
