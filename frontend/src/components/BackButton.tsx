import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const CustomizedButton = styled(Button)`
    position: relative;
    left: 25%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    //margin-left: 35%;
    margin-top: 2rem;
`;

const BackButton = () => {
    const history = useHistory();

    return <div style={{ position: 'absolute' }}>
        <CustomizedButton variant="contained" color="success" onClick={() => history.goBack()}>
            Back
        </CustomizedButton>
    </div>;
};

export default BackButton;