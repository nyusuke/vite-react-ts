import type {
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";
import type { UserType } from "src/types/user";

const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const users: UserType[] = [
    {
      id: 1,
      email: "YUSUKE_NAKAI@tsyscom.co.jp",
      firstName: "Yusuke",
      lastName: "Nakai",
      role: "admin",
      organizationId: 2,
      isDeleted: false,
      createdAt: "2023-02-21T02:24:29.000Z",
      createdBy: "admin",
      updatedAt: "2023-02-21T02:24:29.000Z",
      updatedBy: "admin",
    },
    {
      id: 2,
      email: "SHINKO_O@tsyscom.co.jp",
      firstName: "Shinko",
      lastName: "O",
      role: "admin",
      organizationId: 2,
      isDeleted: false,
      createdAt: "2023-02-21T02:24:29.000Z",
      createdBy: "admin",
      updatedAt: "2023-02-21T02:24:29.000Z",
      updatedBy: "admin",
    },
    {
      id: 3,
      email: "yoshimasa_nagase@ss.toyota-tsusho.com",
      firstName: "Yoshimasa",
      lastName: "Nagase",
      role: "admin",
      organizationId: 1,
      isDeleted: false,
      createdAt: "2023-02-21T02:24:29.000Z",
      createdBy: "admin",
      updatedAt: "2023-02-21T02:24:29.000Z",
      updatedBy: "admin",
    },
  ];

  return res(ctx.status(200), ctx.json<UserType[]>(users));
};

const mockUser = {
  get,
};

export default mockUser;
