import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import { Home, Profile, Tables, Notifications,Main, Admin,Record,RecordDetail, Official } from "@/pages/dashboard";

import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        role:"admin"
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "officialInstitution",
        path: "/official",
        element: <Official />,
        role:"admin"
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Main",
        path: "/main",
        element: <Main />,
        role : "police"
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Record",
        path: "/record",
        element: <Record />,
        role : "police"
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "RecordDetail",
        path: "/recordDetail",
        element: <RecordDetail />,
        role : "police"
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Record",
        path: "/record",
        element: <Record />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "RecordDetail",
        path: "/recordDetail",
        element: <RecordDetail />,
      },
      {

        icon: <HomeIcon {...icon} />,
        name: "Admin",
        path: "/admin",
        element: <Admin />,
        role:"admin"
      },
      {

        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        role:"admin"
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
        role:"admin"
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
        role:"admin"
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        role : "all"
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        role : "all"
      },
    ],
  },
];

export default routes;
