export type OrganizationType = {
  id: number;
  division: string;
  department: string;
  section: string;
};

export interface OrganizationState {
  isLoading: boolean;
  hasError: boolean;
  serverMessage: string | undefined;
  organizations: OrganizationType[] | undefined;
  organization: OrganizationType | undefined;
}
