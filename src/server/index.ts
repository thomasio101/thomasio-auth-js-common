export interface ISession<T> {
	readonly id: string;
	readonly token: string;
	identity: T | null;
}

export type SessionAuthenticator<T> = (session: ISession<T>) => Promise<boolean>;

export type UserAuthenticator<T> = (
	username: string,
	password: string,
) => Promise<{ valid: false } | { valid: true; session: ISession<T> }>;

export type Verifier<T> = (stored: T, input: string) => Promise<boolean>;

export interface IDatabaseInterface<T> {
	userAuthenticator: UserAuthenticator<T>;
	sessionAuthenticator: SessionAuthenticator<T>;
}
