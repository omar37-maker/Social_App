
export interface IUser { 
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
    phoneNumber?: string;
}

export interface IHttpAppError { 
    statusCode: number
    code: string
    details: unknown
    message: string
    stack: string
}