import React from "react";

const HomePage = React.lazy(() => import("src/pages/home-page/HomePage"));
const OrganizationPage = React.lazy(
  () => import("src/pages/organization-page/OrganizationPage")
);
const UserPage = React.lazy(() => import("src/pages/user-page/UserPage"));
const NotFoundPage = React.lazy(
  () => import("src/pages/not-found-page/NotFoundPage")
);

export const PUBLIC_ROUTES = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/organization",
    component: OrganizationPage,
  },
  {
    path: "/user",
    component: UserPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
