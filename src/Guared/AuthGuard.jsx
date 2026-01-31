import { Navigate } from "react-router-dom";
import { RootLayout } from "../Page/RootLayout";

export default function AuthGuard(){
    const logindata = JSON.parse(localStorage.getItem("lognData"))

    if(!logindata){
        return <Navigate to="/login" replace/>
       
    }
     return<RootLayout/>
}