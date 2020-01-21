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

export type UserCreator<E, I> = (
	username: string,
	password: string,
	userData: U,
) => Promise<{ success: true; identity: I } | { success: false; error: E }>;

export type Verifier<T> = (stored: T, input: string) => Promise<boolean>;

export type Processor<T> = (input: string) => Promise<T>;

// TODO: Move userCreator into child interface for read-only database interfaces.
export interface IDatabaseInterface<E, I, U> {
	userAuthenticator: UserAuthenticator<I>;
	sessionAuthenticator: SessionAuthenticator<I>;
	userCreator: UserCreator<E, I, U>;
}
