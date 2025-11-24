import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Footer from "../components/Footer.jsx";
import FooterStyles from "../components/Footer.module.css";


describe("Footer Component", () => {
  it("renders the Footer with the correct links", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const shopLinks = screen.getAllByText(/Shop/i);
    const aboutLinks = screen.getAllByText(/Who we are/i);
    const contactLinks = screen.getAllByText(/Find Us/i);
    const faqLinks = screen.getAllByText(/FAQ/i);
    const recipesLinks = screen.getAllByText(/Recipes/i);
    const eventLinks = screen.getAllByText(/Event/i);
    const connectLinks = screen.getAllByText(/Connect/i);
    expect(shopLinks[0]).toBeInTheDocument();
    expect(aboutLinks[0]).toBeInTheDocument();
    expect(contactLinks[0]).toBeInTheDocument();
    expect(faqLinks[0]).toBeInTheDocument();
    expect(recipesLinks[0]).toBeInTheDocument();
    expect(eventLinks[0]).toBeInTheDocument();
    expect(connectLinks[0]).toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  it("has the correct href attributes for links", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const shopLink = screen.getByText(/Shop/i).closest('a');
    const aboutLink = screen.getByText(/Who we are/i).closest('a');
    const contactLink = screen.getByText(/Find Us/i).closest('a');
    
    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
})

describe('footer component', () => {
  it('The footer is actually prese', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByRole('footer');
    expect(footer).toHaveClass(FooterStyles.footer);
  });
})

describe('Email inout', () => {
  it('The email input is actually present', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('EMAIL ADDRESS');
    expect(emailInput).toBeInTheDocument();
  });
})