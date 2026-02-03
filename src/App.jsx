import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './Component/Route';
import Snowfall from 'react-snowfall'
import { useContext } from 'react';
import { ModeContext } from './Context/ModeContext';

function App() {
         const ctx= useContext(ModeContext);
  
  return (
    <>
      <RouterProvider router={router}/>
      
        <Snowfall color="#008080"       
        speed={[0.5, 2]}     
        wind={[-0.5, 2]}         
        radius={[0.5, 3]}
        
        /> 
     

      
    </>
  )
}
export default App;
