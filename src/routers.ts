import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/_Register";
import PageNotFound from "./404"

import Settings from './dashboard/Settings';
import Tables from './dashboard/Tables';
import Users from './dashboard/Users';
import Debtors from './dashboard/Debtors';
import Business from './dashboard/business/Business';
import SingleBusiness from './dashboard/business/SingleBusiness';
import Transactions from './dashboard/Transactions';
import Maps from './dashboard/Maps';
import Customers from './dashboard/Customers';

export const publicRoutes = [
  { route: "/login", component: Login },
  { route: "/main", component: Main },
  { route: "*", component: PageNotFound },
];

export const privateRoutes = [
  { route: "/", component: Dashboard },
  { route: "/settings", component: Settings },
  { route: "/tables", component: Tables },
  { route: "/users", component: Users },
  { route: "/debtors", component: Debtors },
  { route: "/transactions", component: Transactions },
  { route: "/maps", component: Maps },
  { route: "/customers", component: Customers },
  { route: "/business", component: Business },
  { route: "/single-business", component: SingleBusiness },
];
export const authRoutes = [
  { route: "/login", component: Login }
  // { route: "/register", component: Register },
];
