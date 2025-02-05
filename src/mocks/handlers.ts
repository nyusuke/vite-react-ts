import { http } from "msw";
import API_PATH from "../api/endpoints";
import mockOrganization from "./resolvers/mockOrganization";
import mockName from "./resolvers/mockName";
import mockUser from "./resolvers/mockUser";

const localhost = (path: string): string => {
  return new URL(path, "http://localhost:3010").toString();
};

export const handlers = [
  http.get(localhost(API_PATH.ORGANIZATION.ORGANIZATION), mockOrganization.get),
  http.get(localhost(API_PATH.NAME.NAME), mockName.get),
  http.get(localhost(API_PATH.USER.USER), mockUser.get),
];
