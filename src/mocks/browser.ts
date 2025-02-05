import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 指定されたリクエストハンドラを持つサービスワーカーを設定する
export const worker = setupWorker(...handlers);
