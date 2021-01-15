import { string } from "yup";

export interface User {
    id?: string;
    email: string;
    role: string;
    password?: string;
}
