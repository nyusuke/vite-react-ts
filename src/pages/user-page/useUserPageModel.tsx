import { useEffect } from "react";
import { useUser } from "src/hooks/useUser";
import { useOrganization } from "src/hooks/useOrganization";

export function useUserPageModel() {
  const { getUsers } = useUser();
  const { getOrganizations } = useOrganization();

  // SIDE EFFECT
  // ================================================================================

  // 表示に使うためのデータを取得する
  useEffect(() => {
    const fetchUsers = getUsers();
    const fetchOrganizations = getOrganizations();
    return () => {
      fetchUsers.abort();
      fetchOrganizations.abort();
    };
  }, []);

  // EVENT HANDLER: handlerはuseCallbackする
  // ================================================================================

  // RETURN
  // ================================================================================

  return {};
}
