import { Button, Pagination, Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledGlassButton = styled(Button)`
  position: relative;
  margin-right: 5px;
  margin-left: 5px;
  background-color: purple; /*for compatibility with older browsers*/
  background-image: linear-gradient(#320e3b, #6a1d7d);
  text-shadow: 0px -1px #333;
  border-color: transparent;

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
  margin: 2rem 0.5rem;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledDisabledMicIcon = styled.span`
  background-color: black;
  font-size: 150%;
  padding: 5px 10px;
  border: 1px solid #6a1d7d;
  margin: 2rem 0.5rem;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledHelpButton = styled.span`
  cursor: pointer;
  font-size: large;
`;

export const StyledAttendIcon = styled.span`
  display: flex;
  width: fit-content;
  cursor: pointer;
`;

export const StyledPagination = styled(Pagination)`
  --bs-pagination-active-bg: #6a1d7d;
  --bs-pagination-bg: black;
  --bs-pagination-color: white;
  --bs-pagination-border: 10px solid #6a1d7d;
  --bs-pagination-active-border-color: #a12dbe;
  --bs-pagination-border-color: #6a1d7d;
  justify-content: center;
  justify-self: center;
  margin-top: 1rem;
`;

export const StyledPageNums = styled(Pagination.Item);

export const StyledTranscript = styled.span`
  background-color: #6a1d7d;
  padding: 0.5em;
  border-radius: 20px;
  margin-bottom: 2rem;
  margin-left: 0.5rem;
  margin-right: 2rem;
`;

export const StyledModal = styled(Modal)`
  --bs-modal-bg: #6a1d7d;
  --bs-modal-color: white;
  /* --bs-modal-border: 1px solid #6a1d7d; */
`;

export const StyledModalHeader = styled(Modal.Header)`
  --bs-modal-header-border-width: 0px;
`;

export const StyledATag = styled.a`
  color: #d236f9;
  &:hover {
    color: #320e3b;
  }
`;
