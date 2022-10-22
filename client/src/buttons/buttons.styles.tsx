// export const StyledCardButton = styled(Button);
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledGlassButton = styled(Button)`
  position: relative;
  /* display: inline-block; */
  /* padding: 15px 25px; */
  margin-right: 5px;
  background-color: purple; /*for compatibility with older browsers*/
  background-image: linear-gradient(#320e3b, #6a1d7d);
  text-shadow: 0px -1px #333;
  border-color: transparent;
  /* border-radius: 30px;
  border-collapse: separate; */

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: 50%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.2)
    );
  }

  &:hover {
    background: linear-gradient(#541763, #a12dbe);
  }
`;
