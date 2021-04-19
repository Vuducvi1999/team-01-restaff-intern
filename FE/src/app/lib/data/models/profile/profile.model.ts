import { BaseModel } from "../common";
export interface ProfileModel extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}
export interface ChangePasswordProfileModel{
    userName: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}