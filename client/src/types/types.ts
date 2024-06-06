export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    birthDate: string;
    gender: string;
    profilePhoto: FileList;
  }
  
export type LoginFormData = {
    email: string;
    password: string;
  }

export type User = {
    _id: string;
    name: string;
    profilePhoto: Buffer;
  }  