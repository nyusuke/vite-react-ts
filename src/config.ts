export const currentEnv = process.env.NODE_ENV ?? "local";
// console.log(currentEnv);

const envSettings = {
  local: {
    apiGateway: "http://localhost:3010",
    userPoolId: "ap-northeast-1_l5KbMombq",
    appClientId: "1a191png5bq2moodfcdktat1tb",
    identityPoolId: "ap-northeast-1:6d45e853-69f0-4957-89df-a9713afa0f8d",
    gaTrackingId: "UA-156966715-1",
  },
  development: {
    apiGateway: "http://localhost:3010",
    userPoolId: "ap-northeast-1_l5KbMombq",
    appClientId: "1a191png5bq2moodfcdktat1tb",
    identityPoolId: "ap-northeast-1:6d45e853-69f0-4957-89df-a9713afa0f8d",
    gaTrackingId: "UA-156966715-1",
  },
  staging: {
    apiGateway: "http://localhost:3010",
    userPoolId: "ap-northeast-1_STaGlsoEq",
    appClientId: "2sm1jf2osv9iom39frkde5mki9",
    identityPoolId: "ap-northeast-1:23308c64-5fd9-4486-999c-46077469747b",
    gaTrackingId: "UA-164006703-1",
  },
  production: {
    apiGateway: "http://localhost:3010",
    userPoolId: "ap-northeast-1_ilGronQY9",
    appClientId: "6grr42jt1trefp4t7tt5q6b0f4",
    identityPoolId: "ap-northeast-1:db66684f-e8ef-4d60-b645-a27d774def1e",
    gaTrackingId: "UA-164045198-1",
  },
};

export default {
  s3: {
    REGION: "ap-northeast-1",
    BUCKET: "wms-server-uploads",
  },
  apiGateway: {
    NAME: "millSheetAPIGateway",
    REGION: "ap-northeast-1",
    URL:
      envSettings[currentEnv]?.apiGateway ?? envSettings.development.apiGateway,
  },
  cognito: {
    REGION: "ap-northeast-1",
    USER_POOL_ID:
      envSettings[currentEnv]?.userPoolId ?? envSettings.development.userPoolId,
    APP_CLIENT_ID:
      envSettings[currentEnv]?.appClientId ??
      envSettings.development.appClientId,
    IDENTITY_POOL_ID:
      envSettings[currentEnv]?.identityPoolId ??
      envSettings.development.identityPoolId,
  },
  ga: {
    TRACKING_ID:
      envSettings[currentEnv]?.gaTrackingId ??
      envSettings.development.gaTrackingId,
  },
};
