export type UserBase = {
  _id: string;
  name: string;
  birthDate: string;
  profilePhoto: string;
};

export type UserProfile = UserBase & {
  gender: string;
  email: string;
};

export type RegisterFormData = Omit<UserProfile, '_id' | 'profilePhoto'> & {
  password: string;
  profilePhoto: FileList;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type EditProfileFormData = {
  _id: string;
  name: string;
  password: string;
  profilePhoto: FileList;
};

export type PaginatedResponse<T> = {
  users: T[];
  totalPages: number;
  currentPage: number;
};

export type PaginatedUsersResponse = PaginatedResponse<UserBase>;

