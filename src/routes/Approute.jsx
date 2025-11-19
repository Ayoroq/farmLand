import App from "../App";
import Basket from "../pages/Basket/Basket.jsx";
import Home from "../pages/Home/Home.jsx";
import Shop from "../pages/Shop/Shop.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
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
    ],
  },
];

export default routes;