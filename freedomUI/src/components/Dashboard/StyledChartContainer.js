import styled from 'styled-components';

export default styled.div`
    box-sizing: border-box;
    max-height: 100vh;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    padding-bottom: 40px;

    @media (min-width: 1070px) {  
        margin: 60px 10px;
        flex-grow: 2;
    }
`;