import styled, {keyframes} from 'styled-components';

function slideBarBuilder(first, second, third, fourth) {
    const slideBar = keyframes`
            25% {
                transform: scaleY(${first});
            }
            50% {
                transform: scaleY(${second});
            }
            75% {
                transform: scaleY(${third});
            }
            100% {
                transform: scaleY(${fourth});
            }`;
        return slideBar;
}


export default styled.div`
  margin: 0 5px 0 5px;
  width: 22px;
  height: 60px;
  background-color: orange;
  transform-origin: bottom;
  animation: ${props => slideBarBuilder(props.first, props.second, props.third, props.fourth)}
    2s linear ${props => props.delay}s infinite;
`;