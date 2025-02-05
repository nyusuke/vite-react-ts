import { HttpResponse } from "msw";
import { createNames } from "src/utils/mock/createRandomName";
import type { NameType } from "src/types/name";

const get = () => {
  console.log("get names");
  const names: NameType[] = createNames(100);
  return HttpResponse.json(names);
};

const mockName = {
  get,
};

export default mockName;
