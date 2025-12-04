import App from "../App";
import Basket from "../pages/Basket/Basket.jsx";
import Home from "../pages/Home/Home.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import About from "../pages/About/About.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import ProductDetail from "../pages/Shop/ProductDetails.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

const routes = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "shop/:slug",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
