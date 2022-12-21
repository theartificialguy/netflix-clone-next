import { useState, useMemo, useEffect, createContext, useContext } from "react";
import {
  User,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  loading: boolean;
  error: any | null;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuth>({
  user: null,
  error: null,
  loading: false,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (result) => {
      if (result) {
        setUser(result);
        setLoading(false);
        router.push("/");
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
      setInitialLoading(false);
    });
    return () => unsub();
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) {
        setUser(result?.user);
      }
    } catch (error) {
      setError(error);
      alert(error);
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        setUser(result?.user);
      }
    } catch (error) {
      setError(error);
      alert(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error);
      alert(error);
    }
    setLoading(false);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signIn,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default () => {
  return useContext(AuthContext);
};
