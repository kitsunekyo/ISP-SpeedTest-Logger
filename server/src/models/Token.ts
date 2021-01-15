export interface Token {
    role: string;
    iss: string;
    aud: string;
    email: string;
    iat: number;
    exp: number;
}
