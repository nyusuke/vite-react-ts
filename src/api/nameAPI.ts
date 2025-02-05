import axios from "src/lib/axios";
import amplifyConfig from "src/config";
import API_PATH from "./endpoints";
import type { AxiosResponse } from "axios";
import type { NameType } from "src/types/name";

const nameAPI = {
  /**
   * 組織一覧の取得
   * @return NameType[]
   */
  getNames: async () => {
    console.log(amplifyConfig.apiGateway.URL + API_PATH.NAME.NAME);
    return axios.get<undefined, AxiosResponse<NameType[]>>(
      amplifyConfig.apiGateway.URL + API_PATH.NAME.NAME
    );
  },
};

export default nameAPI;
