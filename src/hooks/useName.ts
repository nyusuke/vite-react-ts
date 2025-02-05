import { useCallback } from "react";
import { useDispatch } from "src/store";
import { getNames as fetchName } from "src/slices/name";
import { RootState, useSelector } from "src/store";
import { nameSelectors } from "src/slices/name";

export function useName() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.name.isLoading);
  const message = useSelector((state: RootState) => state.name.message);
  const names = useSelector(nameSelectors.selectAll);

  // SIDE EFFECT
  // ================================================================================

  // EVENT HANDLER
  // ================================================================================

  const getNames = useCallback(() => {
    const controller = dispatch(fetchName());
    return controller;
  }, []);

  // RETURN
  // ================================================================================

  return {
    isLoading,
    message,
    names,
    getNames,
  };
}
