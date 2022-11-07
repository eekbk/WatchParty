// export const StyledCardButton = styled(Button);
import { Button, Col, Pagination, Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledGlassButton = styled(Button)`
  position: relative;
  /* display: inline-block; */
  /* padding: 15px 25px; */
  margin-right: 5px;
  margin-left: 5px;
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

export const StyledActiveMicIcon = styled.span`
  background-color: #6a1d7d;
  font-size: 150%;
  padding: 5px 10px;
  border: 1px solid white;
  margin: 2rem 1rem;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledDisabledMicIcon = styled.span`
  background-color: black;
  /* color: #6a1d7d; */
  font-size: 150%;
  padding: 5px 10px;
  border: 1px solid #6a1d7d;
  margin: 2rem 1rem;
  text-align: center;
  /* vertical-align: 100%; */
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledHelpButton = styled.span`
  cursor: pointer;
  font-size: large;
  /* color: #6a1d7d; */
`;

export const StyledPlusIcon = styled(Col)`
  padding: 0 0 0 6px;
  margin: 0px;
  font-size: 85%;
  vertical-align: 10%;
  background-color: transparent;
  justify-content: center;
  cursor: pointer;
  /* &:hover {
    font-size: 110%;
  }
  &:focus {
    font-size: 110%;
  } */
`;

export const StyledGoBackIcon = styled(Col)`
  padding: 0 0 0 6px;
  margin: 0px;
  font-size: 85%;
  vertical-align: 8%;
  justify-content: center;
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

export const StyledTranscript = styled.span`
  background-color: #6a1d7d;
  padding: 0.5em;
  border-radius: 20px;
  margin-bottom: 2rem;
`;

export const StyledModal = styled(Modal)`
  --bs-modal-bg: #6a1d7d;
  --bs-modal-color: white;
  /* --bs-modal-border: 1px solid #6a1d7d; */
`;
