export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId: number;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export interface UserState {
  isLoading: boolean;
  hasError: boolean;
  message: string | undefined;
  // users: UserType[] | undefined;
  // user: UserType | undefined;
}
