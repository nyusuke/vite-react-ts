import axios from "src/lib/axios";
import amplifyConfig from "src/config";
import API_PATH from "./endpoints";
import type { AxiosResponse } from "axios";
import type { UserType } from "src/types/user";

const userAPI = {
  /**
   * ユーザ一覧の取得
   * @return UserType[]
   */
  getUsers: async () => {
    console.log(amplifyConfig.apiGateway.URL + API_PATH.USER.USER);
    return axios.get<undefined, AxiosResponse<UserType[]>>(
      amplifyConfig.apiGateway.URL + API_PATH.USER.USER
    );
  },
};

export default userAPI;
