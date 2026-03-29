export interface ILoginResponse {
    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        id: string;
        needPasswordChange : boolean;
        email : string;
        name : string;
        role : string;
        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}

export interface IChangePasswordResponse extends ILoginResponse {
    success: boolean;
    message: string;
}