import { FileDtoModel } from "../files/file.model";

export interface UserDataReturnDTOModel {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  token: string;
}

export interface AuthLoginModel {
  username: string;
  password: string;
}

export class AuthRegistModel {
  username: string;
  password: string;
  confirmpassword: string = undefined;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string = undefined;
  files: FileDtoModel[] = undefined;
}
