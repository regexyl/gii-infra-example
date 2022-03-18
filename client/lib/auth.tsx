import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { createContext, useContext, useState } from 'react';

const serverPort = process.env.SERVER_PORT || 3001;

export interface AuthContextType {
  getAuthToken: () => string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  getVendorEmail: () => string;
  updateLoginDetails: (token: string, email: string) => void;
  isLoggedin: () => boolean;
  logout: () => void;
  createApolloClient: () => ApolloClient<NormalizedCacheObject>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [vendorEmail, setVendorEmail] = useState('');

  const getAuthToken = () => authToken;
  const getVendorEmail = () => vendorEmail;

  const isLoggedin = () => {
    if (authToken) {
      return true;
    }
    return false;
  };

  const updateLoginDetails = (token: string, email: string) => {
    setAuthToken(token);
    setVendorEmail(email);
  };

  const createApolloClient = () => {
    const httpLink = createHttpLink({
      uri: `http://localhost:${serverPort}`,
    });

    // TODO: Add bearer token to every authorized request
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: authToken ? `Bearer ${authToken}` : '',
        },
      };
    });

    return new ApolloClient({
      uri: `http://localhost:${serverPort}`,
      cache: new InMemoryCache(),
    });
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    getAuthToken,
    setAuthToken,
    getVendorEmail,
    updateLoginDetails,
    isLoggedin,
    logout,
    createApolloClient,
  };
}
