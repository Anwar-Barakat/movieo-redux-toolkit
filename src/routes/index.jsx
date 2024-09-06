import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Detail, Explore, Home, Search } from "../pages/index.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: ":explore",
                element: <Explore />
            },
            {
                path: ":explore/:id",
                element: <Detail />
            },
            {
                path: "search",
                element: <Search />
            }
        ]
    }
])

export default router