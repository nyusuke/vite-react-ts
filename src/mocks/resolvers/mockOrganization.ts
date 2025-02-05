import type {
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from "msw";
import type { OrganizationType } from "src/types/organization";

const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const emptyOrgnizations: OrganizationType[] = [];
  const orgnizations: OrganizationType[] = [
    {
      id: 1,
      division: "ビジネスサポート本部",
      department: "ICT推進部",
      section: "ICT推進G",
    },
    {
      id: 2,
      division: "ビジネスサポート本部",
      department: "ICT推進部",
      section: "企画業務支援G",
    },
    {
      id: 3,
      division: "ビジネスサポート本部",
      department: "システムコンサルティング部",
      section: "ビジネスICT規格G",
    },
    {
      id: 4,
      division: "ビジネスサポート本部",
      department: "ICT推進部",
      section: "デジタルシステム開発G",
    },
    {
      id: 5,
      division: "ビジネスサポート本部",
      department: "関連会社システム部",
      section: "ICTマネジメント支援G",
    },
    {
      id: 6,
      division: "ビジネスサポート本部",
      department: "関連会社システム部",
      section: "名古屋関連会社G",
    },
    {
      id: 7,
      division: "ビジネスサポート本部",
      department: "関連会社システム部",
      section: "東京関連会社G",
    },
  ];

  return res(ctx.status(200), ctx.json<OrganizationType[]>(orgnizations));
};

const mockOrganization = {
  get,
};

export default mockOrganization;
