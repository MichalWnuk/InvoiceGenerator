export class User {
    constructor(private userToken: string, private tokenExpirationDate: Date, private userName: string) {
    }

    get token(): string {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }

        return this.userToken;
    }

    getUserName(): string {
        return this.userName;
    }
}
