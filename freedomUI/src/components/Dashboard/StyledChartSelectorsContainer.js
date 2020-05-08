import styled from 'styled-components';

export default styled.div`
    padding: 20px;
    padding-top: 50px;
    height: 80vh;
    width: 300px;
    margin: 10vh auto 10vh auto;
    text-align: center;
    display: inline-block;
    order: 2;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    @media (min-width: 1070px) { 
        order: 2; 
        margin: 0px;
        margin-top: 150px;
        height: 560px;
    }
    @media (min-width: 1200px) { 
        margin-left: 100px;
    }

    @media (min-width: 730px)
    and (max-width: 1070px) {
        width: 90%;
        height: auto; 
        margin-top: 60px;
        margin-bottom: 20px;
    }
`;