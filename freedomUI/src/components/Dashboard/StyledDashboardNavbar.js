import styled from 'styled-components';

export default styled.nav`
    position: absolute;
    font-size: 22px;
    right: 40px;
    top: 10px;
    ul {
        list-style: none;
        list-style-type: none;
    }
    li {
        display: inline;
        margin-left: 15px;
        margin-right: 15px;
    }
    li:hover {
        color: #1890ff;
        cursor: pointer;
    }
    @media (min-width: 1050px) {  
        right: 80px;
    }
`