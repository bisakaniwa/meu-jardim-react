export interface FirebaseUser {
    uid: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    photoURL: string,
    providerId: string,
}

export const USER_VAZIO: FirebaseUser = {
    uid: "",
    displayName: "",
    email: "",
    emailVerified: false,
    photoURL: "",
    providerId: "",
}