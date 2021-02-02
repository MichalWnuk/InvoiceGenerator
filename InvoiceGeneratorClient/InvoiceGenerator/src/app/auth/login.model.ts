export class LoginModel {

    private userName: string;
    public get username(): string {
        return this.userName;
    }
    public set username(v: string) {
        this.userName = v;
    }


    private userEmail: string;
    public get email(): string {
        return this.userEmail;
    }
    public set email(v: string) {
        this.userEmail = v;
    }


    private userPassword: string;
    public get password(): string {
        return this.userPassword;
    }
    public set password(v: string) {
        this.userPassword = v;
    }
}
