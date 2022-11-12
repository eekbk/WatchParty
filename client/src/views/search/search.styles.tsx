import styled from 'styled-components';
import {
  Button,
  Form,
  Container,
  InputGroup,
  Col,
  Row,
  Tabs,
  Tab,
} from 'react-bootstrap';

export const SearchPageHeading = styled(Row)`
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 0px;
  margin-bottom: 0;
  align-items: baseline;
  font-size: 2rem;
`;

export const SearchTabContainer = styled(Container)`
  /* padding: 1em; */
  height: 100%;
  padding-bottom: 30px;
  align-content: space-around;
`;

export const StyledLeftRow = styled(Row)`
  justify-content: left;
  padding: 1rem 0 0 6rem;
`;

export const StyledATag = styled.a`
  color: #6a1d7d;
  font-size: larger;
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: #a663cc;
  }
`;

export const SeeMoreLink = styled.div`
  margin-bottom: 4px;
  text-align: right;
  cursor: pointer;
`;

export const SearchPageCol = styled(Col)`
  align-content: center;
  justify-content: center;
`;

export const SearchPageRow = styled(Row)`
  align-content: center;
  justify-content: left;
`;

export const CenteredSearchPageRow = styled(Row)`
  justify-content: center;
  padding: 1rem;
`;

export const SearchBarContainer = styled(Container)`
  width: 28rem;
  max-width: 80vw;
  height: fit-content;
  background-color: transparent;
  overflow: hidden;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
`;

export const SearchInputContainer = styled(InputGroup)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 0px;
  padding-right: 0px;
  justify-content: center;
`;

export const SearchForm = styled(Form.Control)`
  width: 100%;
  height: 37.25px;
  outline: none;
  border: none;
  font-size: 15px;
  color: #12112e;
  font-weight: 500;
  border-radius: 20px;
  background-color: white;
  padding: 9px;

  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);

  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px black;
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
  background-color: transparent;
  /* margin-right: 10px;
  margin-top: 6px; */
  vertical-align: 10%;
  align-items: center;
  padding-right: 4px;
`;

export const SearchButton = styled(Button)`
  width: 40px;
  height: 37.25px;
  outline: none;
  border: none;
  /* font-size: 15px; */
  /* color: #12112e; */
  font-weight: 500;
  border-radius: 20px;
  background-color: white;
  /* box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14); */

  /* vertical-align: middle; */
  &:hover {
    background-color: #a663cc;
  }
  &:focus {
    background-color: #a663cc;
  }
`;

export const StyledBackLink = styled('p')`
  background: black;
  /* background: rgba(28, 7, 47, 0.75); */
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #6a1d7d;
  color: #e5f4e3;
  margin: 0px;
  margin-bottom: 5px;
  text-align: center;
  width: fit-content;
  padding: 8px 12px;
  display: flex;
  font-size: larger;
  align-self: center;
  user-select: none;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0px 10px 0px white;
  }
  &:focus-visible {
    box-shadow: 0 0px 10px 0px white;
  }
`;

export const StyledTabs = styled(Tabs)`
  --bs-nav-tabs-border-color: #6a1d7d;
  --bs-nav-tabs-link-hover-border-color: #6a1d7d;
  --bs-nav-tabs-link-active-bg: black;
  --bs-nav-tabs-link-active-color: white;
  --bs-nav-tabs-link-active-border-color: #6a1d7d;
  .nav-link {
    color: white;
  }
`;

export const StyledTabNav = styled.ul``;

export const StyledSearchOutlet = styled.div``;

export const StyledTab = styled(Tab)``;

export const StyledRow = styled(Row)`
  justify-content: center;
`;

export const StyledPartyRow = styled(Row)`
  justify-content: right;
`;
