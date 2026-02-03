<<<<<<< HEAD
import { useContext } from 'react';
import { ModeContext } from '../Context/ModeContext';
import './Pagination.css'

export default function Pagination ({currentPage,totalPages,onPrev,onNext, postsPerPage,setpostsPerPage}) {
     const ctx= useContext(ModeContext);
  
    return(
        <>
        <div className={`bttn-container ${ctx.mode}`}>
             <select
      className={`drop ${ctx.mode}`}
        value={postsPerPage}
        onChange={(e) => setpostsPerPage(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
        <button className="button" onClick={onPrev} disabled={currentPage==1}>PREV</button>
        <label>{currentPage} of {totalPages}</label>
         <button className="button" onClick={onNext} disabled={currentPage=== totalPages}>NEXT</button>
        </div>
        </>
    )
=======
import { useContext } from 'react';
import { ModeContext } from '../Context/ModeContext';
import './Pagination.css'

export default function Pagination ({currentPage,totalPages,onPrev,onNext, postsPerPage,setpostsPerPage}) {
     const ctx= useContext(ModeContext);
  
    return(
        <>
        <div className={`bttn-container ${ctx.mode}`}>
             <select
      className={`drop ${ctx.mode}`}
        value={postsPerPage}
        onChange={(e) => setpostsPerPage(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
        <button className="button" onClick={onPrev} disabled={currentPage==1}>PREV</button>
        <label>{currentPage} of {totalPages}</label>
         <button className="button" onClick={onNext} disabled={currentPage=== totalPages}>NEXT</button>
        </div>
        </>
    )
>>>>>>> main
}