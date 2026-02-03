<<<<<<< HEAD
import { createBrowserRouter } from "react-router-dom";
import{ HomePage } from "../Page/HomePage";
import { NewPost } from "../Page/NewPost";
import { Loginform } from "../Page/Loginform";
import { RootLayout } from "../Page/RootLayout";
import { PostDetail } from "./PostDetail";
import AuthGuard from "../Guared/AuthGuard";
import NotFound  from "./NotFound";
import { ExplorePostPage } from "../Page/ExplorePostPage";
import { EditProfileModel } from "./EditProfileModel";
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Loginform/>
    },
    {
        path:"/",
        element:<AuthGuard/>, // for navbar comman view in pages
        children:[
             {
        path:"/",
        element:<HomePage/>,
    },
    {
        path:"/new-post",
        element:<NewPost/>,
    },
    {
        path:"/posts/:postId",
        element:<PostDetail/>,
    },
    {
        path:"/ExplorePost",
        element:<ExplorePostPage/>,
    },
   
    
],
  
},
 {
        path:"*",
        element:<NotFound/>
    },
    
=======
import { createBrowserRouter } from "react-router-dom";
import{ HomePage } from "../Page/HomePage";
import { NewPost } from "../Page/NewPost";
import { Loginform } from "../Page/Loginform";
import { RootLayout } from "../Page/RootLayout";
import { PostDetail } from "./PostDetail";
import AuthGuard from "../Guared/AuthGuard";
import NotFound  from "./NotFound";
import { ExplorePostPage } from "../Page/ExplorePostPage";
import { EditProfileModel } from "./EditProfileModel";
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Loginform/>
    },
    {
        path:"/",
        element:<AuthGuard/>, // for navbar comman view in pages
        children:[
             {
        path:"/",
        element:<HomePage/>,
    },
    {
        path:"/new-post",
        element:<NewPost/>,
    },
    {
        path:"/posts/:postId",
        element:<PostDetail/>,
    },
    {
        path:"/ExplorePost",
        element:<ExplorePostPage/>,
    },
   
    
],
  
},
 {
        path:"*",
        element:<NotFound/>
    },
    
>>>>>>> main
]);