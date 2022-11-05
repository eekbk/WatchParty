// export const StyledCardButton = styled(Button);
import { Button, Col, Pagination } from 'react-bootstrap';
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

export const StyledPlusIcon = styled(Col)`
  padding: 0px;
  margin: 0px;
  font-size: 85%;
  vertical-align: 10%;
  background-color: transparent;
  cursor: pointer;
  /* &:hover {
    font-size: 110%;
  }
  &:focus {
    font-size: 110%;
  } */
`;

export const StyledGoBackIcon = styled(Col)`
  padding: 0px;
  margin: 0px;
  font-size: 85%;
  vertical-align: 8%;
  cursor: pointer;
`;

export const StyledPagination = styled(Pagination)`
  --bs-pagination-active-bg: #6a1d7d;
  --bs-pagination-bg: black;
  --bs-pagination-color: white;
  --bs-pagination-border: 10px solid #6a1d7d;
  justify-content: center;
  justify-self: center;
  margin-top: 1rem;
  /* bottom: 30px;
  position: absolute; */
  /* align-self: baseline; */
`;

export const StyledPageNums = styled(Pagination.Item);
