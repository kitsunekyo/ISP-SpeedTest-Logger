export interface Token {
    role: string;
    iss: string;
    aud: string;
    sub: string;
    iat: number;
    exp: number;
}
