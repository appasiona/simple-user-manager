export interface UserI {
    id: number;
    username?: string;
    expirationDate?: Date;  
    password?: string;
    enabled?: boolean;
}

export class User implements UserI {
    id: number;
    username: string;
    expirationDate: Date; 
    password: string;
    enabled: boolean;

    constructor(id: number, username: string, expirationDate: Date, password: string, enabled: boolean) {
        this.id = id;
        this.username = username;
        this.expirationDate = expirationDate;
        this.password = password;
        this.enabled = enabled;
    }
}
