import type { ErrorResponse } from "../types/common";
import axios, { AxiosError } from "axios";

/**
 * asyncをtryしたときにcatchしたerrをもらってmessageを返す
 * ・requestが行われてサーバからresponseが返ってきた場合、errはAxiosErrorで、messageはerr.response.data.message
 * ・requestが行われてサーバに到達する前に何かが起こった場合、errはAxiosErrorで、messageはerr.message
 * ・requestが行われずに何かが起こった（ロジックミス等）場合、errはErrorで、messageはerr.message
 * @param err: AxiosError | Error
 * @returns message: string
 */
const getAsyncErrorMessage = (err: AxiosError | Error): string => {
  if (axios.isAxiosError(err)) {
    // err: AxiosError
    if (err.response) {
      const serverResponse: ErrorResponse = err.response.data;
      return serverResponse.message;
    } else {
      return err.message;
    }
  } else {
    // err: Error
    return err.message;
  }
};

export default getAsyncErrorMessage;
