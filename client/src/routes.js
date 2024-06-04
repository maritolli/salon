import {AUTH_ROUTE, HISTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SERVICES_ROUTE} from "./utils/consts";
import HistoryPage from "./pages/HistoryPage";
import MainPage from "./pages/mainPage/MainPage";
import Auth from "./pages/Auth/Auth";
import Services from "./pages/Services";

export const authRoutes=[
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: SERVICES_ROUTE,
        Component: Services
    },
    {
        path: HISTORY_ROUTE,
        Component: HistoryPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    }
]

export const publicRoutes=[
    {
        path: SERVICES_ROUTE,
        Component: Services
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    }
]