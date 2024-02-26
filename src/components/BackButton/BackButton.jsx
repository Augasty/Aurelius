import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const history = useNavigate();

  return <button onClick={() => history(-1)}>Back</button>

};

export default BackButton;
