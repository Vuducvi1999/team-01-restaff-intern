import { BaseModel } from '../common';
import { UserModel } from '../users/user.model';
export interface CustomerModel extends BaseModel, UserModel {
}

export interface CustomerInfoModel extends BaseModel
{
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: string,
    userId: string,
    username: string,
    hasInfo: boolean,
    type: number,
}