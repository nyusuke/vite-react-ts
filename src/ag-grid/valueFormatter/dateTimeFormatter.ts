import { DateTime } from "luxon";
import type { ValueFormatterParams } from "ag-grid-community";

/**
 * UTC stringのカラムに対してvalueFormatterとして設定すると「yyyy-MM-dd HH:mm:ss」形式で表示するフォーマッタ
 * @param params [ValueFormatterParams]
 * @returns [string]
 */
export const dateTimeFormatter = (params: ValueFormatterParams): string => {
  const value = params.value; // 引数からそのセルの値を取得
  const dateTime: DateTime = DateTime.fromISO(value); // ライブラリ（luxon）で利用できる形へ変換
  const formattedDate = dateTime.isValid
    ? // https://moment.github.io/luxon/#/formatting?id=table-of-tokens
      dateTime.toFormat("yyyy-MM-dd HH:mm:ss") // validな日付だったら「yyyy-MM-dd HH:mm:ss」の形へ変換
    : value; // validでなかったらそのまま表示
  return formattedDate;
};
