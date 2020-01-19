export interface ISession<T> {
	readonly id: string;
	readonly token: string;
	identity: T | null;
}

export type SessionAuthenticator<T> = (session: ISession<T>) => Promise<boolean>;

export type UserAuthenticator<T> = (
	username: string,
	password: string,
) => { valid: false } | { valid: true; session: ISession<T> };