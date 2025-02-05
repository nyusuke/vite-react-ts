import { useCallback } from "react";
import { useDispatch } from "src/store";
import { getOrganizations as fetchOrganization } from "src/slices/organization";
import { RootState, useSelector } from "src/store";
import { organizationSelectors } from "src/slices/organization";
import type { OrganizationType } from "src/types/organization";

export function useOrganization() {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.organization.isLoading
  );
  const message = useSelector((state: RootState) => state.organization.message);
  const organizations = useSelector(organizationSelectors.selectAll);

  // SIDE EFFECT
  // ================================================================================

  // EVENT HANDLER
  // ================================================================================

  const getOrganizations = useCallback(() => {
    const controller = dispatch(fetchOrganization());
    return controller;
  }, []);

  const getOrganizationName = useCallback(
    (id: number | undefined): string => {
      const target =
        organizations?.find((organization) => organization.id === id) ??
        undefined;
      if (target) {
        const organizationName =
          target.division + " " + target.department + " " + target.section;
        return organizationName;
      } else {
        return "";
      }
    },
    [organizations]
  );

  // RETURN
  // ================================================================================

  return {
    getOrganizationName,
    getOrganizations,
    isLoading,
    message,
    organizations,
  };
}
