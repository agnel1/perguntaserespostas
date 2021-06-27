import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

export const AuthContext = createContext({} as AuthContextType);

//joga para a aplicação
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }
  
  type AuthContextProviderProps = {
      children: ReactNode;
  }

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<User>()

    // pega o usuario do firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error("Falta informações do Google");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return ()=> {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    //logando o usuario com o google
    const provider = new firebase.auth.GoogleAuthProvider();

    // o result é o popup que aparece quando clica em login com o google
    const result = await auth.signInWithPopup(provider)

    // pefa as informações de nome, foto e uid do usuario
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error("Falta informações do Google");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}