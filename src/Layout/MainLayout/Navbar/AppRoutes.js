// @material-ui/icons
import {
  Home,
  Notifications,
  Assessment,
  People,
  Person,
  SupervisorAccount,
  Computer,
  AddBox,
  ViewList,
  Article,
  Email,
  Paid,
  ExitToApp,
  AccountCircle,
  PersonAddAltRounded,
} from "@mui/icons-material";

export const ClientUserRoutes = [
  {
    href: "/app/home",
    icon: Home,
    title: "Home",
  },
  {
    href: "/app/profile",
    icon: AccountCircle,
    title: "Profile",
  },
  //   {
  //     href: "/app/tax-filing",
  //     icon: Assessment,
  //     title: "Tax Filing",
  //   },
  {
    href: "/app/refer",
    icon: Paid,
    title: "Refer",
  },
];

export const AdminUserRoutes = [
  {
    href: "/app/home/clients",
    icon: People,
    title: "Clients",
  },
  {
    href: "/app/home/associates_list",
    icon: ViewList,
    title: "Associates List",
  },
  {
    href: "/app/home/add_associate",
    icon: PersonAddAltRounded,
    title: "Add Associate",
  },
  {
    href: "/app/profile",
    icon: AccountCircle,
    title: "Profile",
  },

  //   {
  //     href: "/app/notification",
  //     icon: Notifications,
  //     title: "Notification",
  //   },
  // {
  //   href: "/app/profile",
  //   icon: Person,
  //   title: "Profile",
  // },
];
