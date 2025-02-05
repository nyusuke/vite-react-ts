import { useCallback } from "react";
import { useDispatch } from "src/store";
import { getUsers as fetchUser } from "src/slices/user";
import { RootState, useSelector } from "src/store";
import { userSelectors } from "src/slices/user";

export function useUser() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const message = useSelector((state: RootState) => state.user.message);
  const users = useSelector(userSelectors.selectAll);

  // SIDE EFFECT
  // ================================================================================

  // EVENT HANDLER
  // ================================================================================

  const getUsers = useCallback(() => {
    const controller = dispatch(fetchUser());
    return controller;
  }, []);

  // RETURN
  // ================================================================================

  return {
    isLoading,
    message,
    users,
    getUsers,
  };
}
