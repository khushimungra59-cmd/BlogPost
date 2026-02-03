
  import { useContext, useEffect, useState } from "react";
  import Card from "../Component/Card";
  import ConfirmationModel from "../Component/ConfirmationModel";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";
import '../Component/Card.css'
import { ModeContext } from "../Context/ModeContext";


      export function HomePage  ()  {
        const navigate =useNavigate();
       const ctx= useContext(ModeContext);
        const[allPostData,setAllPostData]=useState([]);
        const [showModel,setShowModel]=useState(false)
        const [selectedIndex,setSelectedIndex]=useState(null);

        useEffect(()=>{
          const storedData =JSON.parse(localStorage.getItem("PostData")) || [] ;
            setAllPostData(storedData);
        },[]);
           
        const scrollToTop =(id)=>{
          const element = document.getElementById(id);
          if(element){
            element.scrollIntoView({behavior:'smooth'});
          }
        };
        const openDeleteModel = (index)=>{
          console.log(index,"index");
          setSelectedIndex(index);
          setShowModel(true);
        };
        const clickHandler=(id)=>{
          navigate(`/posts/${id}`);
        }

        const confirmDelete=()=>{
          const updatedPostData = allPostData.filter((_, i)=> i!==selectedIndex);
          console.log(updatedPostData,"updatedData");
          setAllPostData(updatedPostData);
          localStorage.setItem("PostData",JSON.stringify(updatedPostData));
          setShowModel(false);
        };
          const editHandle=(id)=>{
            console.log({id});
            //pass data from one page to another
            navigate("/new-post",{ state: {id} });
          }
      return(
          <>
       
          
        <div className= {`container ${ctx.mode}`}>
       <span id='top'></span>
    
          {allPostData.length === 0 ? (
              <p className="card1">No Data Found</p>
              ) : (
                  allPostData.map((item, index) => (
                  <Card
                    key={index}
                    title={item.title}
                    desc={item.body}
                    image={item.image}
                    onRedirect={()=>clickHandler(item.id)}
                    onDelete={() => openDeleteModel(index)}
                    onEdit={()=>editHandle(item.id)}
                    ShowAction={true} 
                        />
                      ))
                  )}
                

      <FaArrowCircleUp onClick={()=>{scrollToTop('top')}} className="top-btn"/>


        </div>
        {showModel && (
          <ConfirmationModel
          title="Delete Post"
          desc="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onClose={()=>setShowModel(false)}
          confirmBtnText="Delete"
          
          />
        
        )}
        
          </>
      );
  }

    