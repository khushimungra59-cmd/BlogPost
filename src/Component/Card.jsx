<<<<<<< HEAD
    import { useContext } from "react";
import { ModeContext } from "../Context/ModeContext";
import "./Card.css";
   
    const Card =(props) => {
        const loggedInUserData = JSON.parse(localStorage.getItem("lognData")) || {};
        const description = props.desc ? String(props.desc) : "";
         const ctx= useContext(ModeContext);
        return(
       <div className= {`card ${ctx.mode}`}>
            <div className="icon-center" onClick={props.onRedirect}>
                <img src={props.image ? props.image :` https://picsum.photos/seed/${Date.now()}/500/300 ` }alt=""/></div>
            <div className="card-content">
                <h1>{props.title}</h1>
<p>
  {description.length > 90
    ? description.slice(0, 90) + "..."
    : description}
</p>            </div>
        
            
            {loggedInUserData?.role === "admin"?
            <div 
            className="action-btn">
            <button className="btn" onClick={props.onEdit}>Edit</button>
            <button className="btn" onClick={props.onDelete}>Delete</button>
            </div>:<></>}
            </div>
        
        );
    };
    export default Card;
=======
    import { useContext } from "react";
import { ModeContext } from "../Context/ModeContext";
import "./Card.css";
   
    const Card =(props) => {
        const loggedInUserData = JSON.parse(localStorage.getItem("lognData")) || {};
        const description = props.desc ? String(props.desc) : "";
         const ctx= useContext(ModeContext);
        return(
       <div className= {`card ${ctx.mode}`}>
            <div className="icon-center" onClick={props.onRedirect}>
                <img src={props.image ? props.image :` https://picsum.photos/seed/${Date.now()}/500/300 ` }alt=""/></div>
            <div className="card-content">
                <h1>{props.title}</h1>
<p>
  {description.length > 90
    ? description.slice(0, 90) + "..."
    : description}
</p>            </div>
        
            
            {loggedInUserData?.role === "admin"?
            <div 
            className="action-btn">
            <button className="btn" onClick={props.onEdit}>Edit</button>
            <button className="btn" onClick={props.onDelete}>Delete</button>
            </div>:<></>}
            </div>
        
        );
    };
    export default Card;
>>>>>>> main
