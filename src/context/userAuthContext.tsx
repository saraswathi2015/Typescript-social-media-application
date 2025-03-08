import { User } from "firebase/auth/cordova"
import {  createContext, useEffect,useState,useContext} from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { GoogleAuthProvider } from "firebase/auth/web-extension"
// import { User } from "lucide-react"

interface IUserProviderProps{
    children:React.ReactNode
}

type AuthContextData = {
    user:User | null;
    logIn : typeof logIn;
    signUp: typeof signUp;
    logOut:typeof logOut;
    googleSignIn:typeof googleSignIn;
}

const logIn = (email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const signUp = (email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

const logOut = () =>{
    signOut(auth)
}
const googleSignIn = ()=>{
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth,googleAuthProvider)
}

 const userAuthContext = createContext<AuthContextData>({
    user:null,
    logIn,
    signUp,
    logOut,
    googleSignIn
})

export const UserAuthProvider:React.FC <IUserProviderProps> = ({children})=>{

    const[user,setUser] = useState<User | null>(null)

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                console.log("the logged in user state is :" , user)
                setUser(user)
            }
            return ()=>{
                unSubscribe()
            }
        }
    )
    })

    const value:AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }

   return (
    <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
   )
}

export const useUserAuth = () => {
    return useContext(userAuthContext)
}