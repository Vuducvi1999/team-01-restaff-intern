import { BaseModel } from "../common";
import { FileDtoModel } from "../files/file.model";
export interface ProfileModel extends BaseModel {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string;
    files: FileDtoModel[];
}
export interface ChangePasswordProfileModel{
    password: string;
    newPassword: string;
}