import { useLocation, useNavigate } from 'react-router-dom';
import btn from "../../sharedStyles/SmallButtonStyle.module.css"
const BackButton = () => {
    const location = useLocation();
    const history = useNavigate();
    if(location.pathname == '/'){
        return <></>
    }
  return (
    <div style={{
        position:'sticky',
        bottom:'1vh',
        left:'0.2vw',
        zIndex:'2'
        
    }}>
      <button className={btn.SmallButton} style={{border:'0.1vh solid black'}} onClick={() => history(-1)}>Back</button>
    </div>
  );
};

export default BackButton;
