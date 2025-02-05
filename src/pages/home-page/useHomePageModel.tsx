import { useEffect } from "react";
import { useName } from "src/hooks/useName";

export function useHomePageModel() {
  const { getNames } = useName();

  // SIDE EFFECT
  // ================================================================================

  // 表示に使うためのデータを取得する
  useEffect(() => {
    const fetchNames = getNames();
    return () => {
      fetchNames.abort();
    };
  }, []);

  // EVENT HANDLER
  // ================================================================================

  // RETURN
  // ================================================================================

  return {};
}
