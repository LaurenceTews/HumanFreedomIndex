import styled from "styled-components";
import RiceField from "../../assets/rice-field_opt.jpg";

export default styled.div`
  background-image: url(${RiceField});
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: -1;
  opacity: 0.8;
`;