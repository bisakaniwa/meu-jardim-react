export interface ReduxApp {
   userData: ReduxUser,
   userToken: UserTokenInfo,
   isLoggedIn: boolean,
   isLoading: boolean,
   error: boolean,
};

export interface ReduxUser {
   userId: string,
   displayName: string | null,
   email: string | null,
   emailVerified: boolean,
   isAnonymous: boolean,
   photoURL: string | null,
   loginProvider: string,
};


export interface UserTokenInfo {
   currentToken: string,
   expirationTime: string,
   // TODO: buscar variável no firebase que lide com isExpired ou construir fn para lidar
   isExpired: boolean,
};