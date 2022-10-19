import styled from 'styled-components';
import {
  Button,
  Form,
  Container,
  InputGroup,
  Card,
  Image,
} from 'react-bootstrap';

export const SearchBarContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: 3.8em;
  background-color: transparent;
  padding-top: 12px;
  overflow: hidden;
`;

export const SearchInputContainer = styled(InputGroup)`
  width: 100%;
  /* min-height: 4em; */
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

export const SearchForm = styled(Form.Control)`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  color: #12112e;
  font-weight: 500;
  border-radius: 20px;
  background-color: white;
  padding: 8px;

  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  /* vertical-align: middle; */

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

export const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 15px;
  background-color: white;
  /* margin-right: 10px;
  margin-top: 6px; */
  vertical-align: 10%;
  align-items: center;
  padding-right: 4px;
`;

export const SearchButton = styled(Button)`
  width: 40px;
  height: 100%;
  outline: none;
  border: none;
  /* font-size: 15px; */
  /* color: #12112e; */
  font-weight: 500;
  border-radius: 20px;
  background-color: white;
  padding: 4px;
  /* box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14); */

  /* vertical-align: middle; */
`;

export const StyledPartyCard = styled(Card)`
  height: 20rem;
  width: 18rem;
  padding: 0 auto;
  cursor: pointer;
`;

export const StyledUserCard = styled(Card)`
  width: 18rem;
  height: 10rem;
`;

export const StyledUserCardImg = styled(Image)`
  width: 100px;
  height: 100px;
  margin: 8px;
`;

export const StyledCardBody = styled(Card.Body)`
  padding-left: 20px;
  margin: 0 auto;
  /* text-align: right; */
`;

export const StyledCardButton = styled(Button);
