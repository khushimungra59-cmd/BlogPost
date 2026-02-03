import { useContext } from 'react';
import { ModeContext } from '../Context/ModeContext';
import './ConfirmationModel.css';

 const ConfirmationModel = ({
    title,
    desc,
    onConfirm,
    onClose,
    confirmBtnText,
}) => {

             const ctx= useContext(ModeContext);
    
    return(
        <div className="model-backdrop">
            <div className={`model ${ctx.mode}`}>
                <h2 className={`h2 ${ctx.mode}`}>{title}</h2>
                <p className={`p ${ctx.mode}`}>{desc}</p>

                <div className="model-actions">

                    <button className="btn btn-cancel" onClick={onClose}>Cancel  </button>
                    <button className="btn btn-delete" onClick={onConfirm}>
                        {confirmBtnText}
                    </button>
                </div>
            </div>
        </div>
    )
}
 export default ConfirmationModel;




  