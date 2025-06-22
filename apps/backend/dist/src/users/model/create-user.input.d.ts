export declare enum UserProvider {
    LOCAL = "local",
    GOOGLE = "google",
    GITHUB = "github"
}
export declare class CreateUserInput {
    email: string;
    password?: string;
    name: string;
    provider: UserProvider;
    providerId?: string;
}
