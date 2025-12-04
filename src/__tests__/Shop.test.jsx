import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Shop from "../pages/Shop/Shop";
import { BasketContext } from "../context/BasketContext";

// Mock products data
vi.mock("../data/products", () => ({
  products: [
    {
      id: 1,
      name: "Tomatoes",
      slug: "tomatoes",
      price: 4.99,
      category: "vegetables",
      image: "/images/tomatoes.jpg",
      description: "Fresh organic tomatoes",
    },
    {
      id: 2,
      name: "Apples",
      slug: "apples",
      price: 5.99,
      category: "fruits",
      image: "/images/apples.jpg",
      description: "Crisp organic apples",
    },
    {
      id: 3,
      name: "Eggs",
      slug: "eggs",
      price: 6.59,
      category: "organic",
      image: "/images/eggs.jpg",
      description: "Farm-fresh eggs",
    },
    {
      id: 4,
      name: "Spinach",
      slug: "spinach",
      price: 3.99,
      category: "vegetables",
      image: "/images/spinach.jpg",
      description: "Nutrient-rich spinach",
    },
  ],
}));

// Mock basket context
const mockBasketContext = {
  basket: [],
  addToBasket: vi.fn(),
  removeFromBasket: vi.fn(),
  changeQuantity: vi.fn(),
};

// Helper to render component with providers
const renderWithProviders = (basketValue = mockBasketContext) => {
  return render(
    <BrowserRouter>
      <BasketContext.Provider value={basketValue}>
        <Shop />
      </BasketContext.Provider>
    </BrowserRouter>
  );
};

describe("Shop Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Product Display", () => {
    it("should render all products initially", () => {
      renderWithProviders();

      expect(screen.getByText("Tomatoes")).toBeInTheDocument();
      expect(screen.getByText("Apples")).toBeInTheDocument();
      expect(screen.getByText("Eggs")).toBeInTheDocument();
      expect(screen.getByText("Spinach")).toBeInTheDocument();
    });

    it("should display product prices correctly", () => {
      renderWithProviders();

      expect(screen.getByText(/\$4\.99/)).toBeInTheDocument();
      expect(screen.getByText(/\$5\.99/)).toBeInTheDocument();
      expect(screen.getByText(/\$6\.59/)).toBeInTheDocument();
      expect(screen.getByText(/\$3\.99/)).toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should filter products based on search input", async () => {
      renderWithProviders();

      const searchInput = screen.getByPlaceholderText("Search Here");
      fireEvent.change(searchInput, { target: { value: "tomato" } });

      await waitFor(() => {
        expect(screen.getByText("Tomatoes")).toBeInTheDocument();
        expect(screen.queryByText("Apples")).not.toBeInTheDocument();
        expect(screen.queryByText("Eggs")).not.toBeInTheDocument();
        expect(screen.queryByText("Spinach")).not.toBeInTheDocument();
      });
    });

    it("should show no results when search matches nothing", async () => {
      renderWithProviders();

      const searchInput = screen.getByPlaceholderText("Search Here");
      fireEvent.change(searchInput, { target: { value: "nonexistent" } });

      await waitFor(() => {
        expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
        expect(screen.queryByText("Apples")).not.toBeInTheDocument();
        expect(screen.queryByText("Eggs")).not.toBeInTheDocument();
        expect(screen.queryByText("Spinach")).not.toBeInTheDocument();
      });
    });

    it("should be case insensitive", async () => {
      renderWithProviders();

      const searchInput = screen.getByPlaceholderText("Search Here");
      fireEvent.change(searchInput, { target: { value: "APPLE" } });

      await waitFor(() => {
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
      });
    });
  });

  describe("Filter Functionality", () => {
    it("should open filter dropdown when filter button is clicked", () => {
      renderWithProviders();

      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      expect(screen.getByText("Sort By")).toBeInTheDocument();
      expect(screen.getByText("Filter By")).toBeInTheDocument();
    });

    it("should filter products by fruits category", async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      // Click fruits filter
      const fruitsFilter = screen.getByText("Fruits");
      fireEvent.click(fruitsFilter);

      await waitFor(() => {
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
        expect(screen.queryByText("Spinach")).not.toBeInTheDocument();
        expect(screen.queryByText("Eggs")).not.toBeInTheDocument();
      });
    });

    it("should filter products by vegetables category", async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      // Click vegetables filter
      const vegetablesFilter = screen.getByText("Vegetables");
      fireEvent.click(vegetablesFilter);

      await waitFor(() => {
        expect(screen.getByText("Tomatoes")).toBeInTheDocument();
        expect(screen.getByText("Spinach")).toBeInTheDocument();
        expect(screen.queryByText("Apples")).not.toBeInTheDocument();
        expect(screen.queryByText("Eggs")).not.toBeInTheDocument();
      });
    });

    it("should filter products by organic category", async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      // Click organic filter
      const organicFilter = screen.getByText("Organic");
      fireEvent.click(organicFilter);

      await waitFor(() => {
        expect(screen.getByText("Eggs")).toBeInTheDocument();
        expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
        expect(screen.queryByText("Apples")).not.toBeInTheDocument();
        expect(screen.queryByText("Spinach")).not.toBeInTheDocument();
      });
    });

    it("should allow multiple filters to be selected", async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      // Click fruits and vegetables filters
      const fruitsFilter = screen.getByText("Fruits");
      const vegetablesFilter = screen.getByText("Vegetables");
      fireEvent.click(fruitsFilter);
      fireEvent.click(vegetablesFilter);

      await waitFor(() => {
        expect(screen.getByText("Apples")).toBeInTheDocument();
        expect(screen.getByText("Tomatoes")).toBeInTheDocument();
        expect(screen.getByText("Spinach")).toBeInTheDocument();
        expect(screen.queryByText("Eggs")).not.toBeInTheDocument();
      });
    });
  });

  describe("Sort Functionality", () => {
    it("should sort products by price low to high", async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole("button", {
        name: /Filter & Sort/i,
      });
      fireEvent.click(filterButton);

      // Click price low to high sort
      const sortButton = screen
        .getAllByText("Price")[0]
        .parentElement.querySelector("button");
      fireEvent.click(sortButton);

      await waitFor(() => {
        const products = screen.getAllByText(/\$\d+\.\d+/);
        const prices = products.map((p) =>
          parseFloat(p.textContent.replace("$", ""))
        );
        expect(prices[0]).toBeLessThanOrEqual(prices[1]);
      });
    });

    it("should display sort control when sorting is active", async () => {
      renderWithProviders();

      // Open filter dropdown and sort
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      const sortButton = screen
        .getAllByText("Price")[0]
        .parentElement.querySelector("button");
      fireEvent.click(sortButton);

      await waitFor(() => {
        expect(screen.getByText(/Sorted by Price/)).toBeInTheDocument();
      });
    });

    it("should clear sort when clear button is clicked", async () => {
      renderWithProviders();

      // Open filter dropdown and sort
      const filterButton = screen.getByRole("button", { name: /filter/i });
      fireEvent.click(filterButton);

      const sortButton = screen
        .getAllByText("Price")[0]
        .parentElement.querySelector("button");
      fireEvent.click(sortButton);

      await waitFor(() => {
        expect(screen.getByText(/Sorted by Price/)).toBeInTheDocument();
      });

      // Clear sort
      const clearButton = screen.getByRole("button", { name: /Remove sort/i });
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByText(/Sorted by Price/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Filter Controls', () => {
    it('should display active filters', async () => {
      renderWithProviders();

      // Open filter dropdown
      const filterButton = screen.getByRole('button', { name: /filter/i });
      fireEvent.click(filterButton);

      // Apply fruits filter
      const fruitsFilter = screen.getByText('Fruits');
      fireEvent.click(fruitsFilter);

      await waitFor(() => {
        expect(screen.getByText('fruits')).toBeInTheDocument();
      });
    });

    it('should remove filter when filter control button is clicked', async () => {
      renderWithProviders();

      // Open filter dropdown and apply filter
      const filterButton = screen.getByRole('button', { name: /filter/i });
      fireEvent.click(filterButton);

      const fruitsFilter = screen.getByText('Fruits');
      fireEvent.click(fruitsFilter);

      await waitFor(() => {
        expect(screen.getByText('fruits')).toBeInTheDocument();
      });

      // Remove filter
      const removeFilterButton = screen.getByRole('button', {name: /remove fruits/i});
      fireEvent.click(removeFilterButton);

      await waitFor(() => {
        expect(screen.queryByText('fruits')).not.toBeInTheDocument();
        // All products should be visible again
        expect(screen.getByText('Tomatoes')).toBeInTheDocument();
        expect(screen.getByText('Eggs')).toBeInTheDocument();
      });
    });
  });
});
