import { DateTime } from "luxon";

/**
 * agDateColumnFilterに渡すcomparator
 * @param selectedDate Dateコンポーネントで選択された日付
 * @param cellString セルの値（文字列）
 * @returns -1 | 0 | 1
 */
export function dateFilterComparator(
  selectedDate: Date,
  cellString: string
): number {
  // console.log('valueDate: ', valueDate, 'valueString: ', valueString);
  const dateTime: DateTime = DateTime.fromISO(cellString); // ライブラリ（luxon）で利用できる形へ変換
  const selectedDateTime: DateTime = DateTime.fromJSDate(selectedDate); // ライブラリ（luxon）で利用できる形へ変換
  if (dateTime.isValid) {
    if (dateTime.startOf("day") < selectedDateTime.startOf("day")) {
      return -1;
    } else if (dateTime.startOf("day") > selectedDateTime.startOf("day")) {
      return 1;
    } else {
      return 0;
    }
  } else {
    // console.log('cellString is not valid date: ', cellString);
    return -1;
  }
}
