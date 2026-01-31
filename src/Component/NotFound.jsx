import { Navbar } from "./Navbar";
import Lottie from "react-lottie-player";
import errorAnimation from "../assets/404 blue.json"; 

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div style={{
                textAlign: "center", 
                padding: "40px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center" 
            }}>
                <div style={{ width: "300px", height: "300px" }}>
                    <Lottie 
                        loop 
                        animationData={errorAnimation} 
                        play 
                        style={{ width: 500, height: 500, }} 
                    />
                </div>

                {/* <h1 style={{color:"#995687"}}>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist</p> */}
            </div>
        </>
    );
};
