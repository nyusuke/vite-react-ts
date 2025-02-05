import axios from "../lib/axios";
import amplifyConfig from "../config";
import API_PATH from "./endpoints";
import type { AxiosResponse } from "axios";
import type { OrganizationType } from "../types/organization";

const organizationAPI = {
  /**
   * 組織一覧の取得
   * @return OrganizationType[]
   */
  getOrganizations: async () => {
    console.log(
      amplifyConfig.apiGateway.URL + API_PATH.ORGANIZATION.ORGANIZATION
    );
    return axios.get<undefined, AxiosResponse<OrganizationType[]>>(
      amplifyConfig.apiGateway.URL + API_PATH.ORGANIZATION.ORGANIZATION
    );
  },
};

export default organizationAPI;
