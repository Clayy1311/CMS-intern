export interface RegisterUserInput {
    fullName : string
    email: string,
    company: string,
    job: string,
    country: string,
    password?:string
}

export interface LoginUserInput {
    email : string,
    password : string
}

export interface VerifyEmail {
    email : string
}

export interface ResetPassword {
    token: string,
    newPassword: string
   
}