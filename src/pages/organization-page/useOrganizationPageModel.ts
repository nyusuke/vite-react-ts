import { useCallback, useEffect, useState } from "react";
import { useOrganization } from "src/hooks/useOrganization";

export function useOrganizationPageModel() {
  const { getOrganizations } = useOrganization();
  const [searchText, setSearchText] = useState<string>("");
  const [editAction, setEditAction] = useState<string | undefined>(undefined);

  // SIDE EFFECT
  // ================================================================================

  // 表示に使うためのデータを取得する
  useEffect(() => {
    const fetchOrganization = getOrganizations();
    return () => {
      fetchOrganization.abort();
    };
  }, []);

  // 変更点をコンソールに表示する
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);
  useEffect(() => {
    console.log(editAction);
  }, [editAction]);

  // EVENT HANDLER: handlerはuseCallbackする
  // ================================================================================

  /**
   * 編集する
   */
  const handleAdd = useCallback((): void => {
    setEditAction("Add");
  }, []);
  const handleEdit = useCallback((): void => {
    setEditAction("Edit");
  }, []);
  const handleDelete = useCallback((): void => {
    setEditAction("Delete");
  }, []);

  /**
   * 検索文字列を変更する
   * @param params SyntheticEvent
   */
  const handleChangeSearchText = useCallback(
    (event: React.SyntheticEvent<{ value: string }>): void => {
      const text: string = event.currentTarget.value;
      setSearchText(() => text);
    },
    []
  );

  /**
   * 検索する
   */
  const handleSearch = useCallback((): void => {
    console.log(searchText);
  }, [searchText]);

  // RETURN
  // ================================================================================

  return {
    handleAdd,
    handleEdit,
    handleDelete,
    searchText,
    handleChangeSearchText,
    handleSearch,
  };
}
