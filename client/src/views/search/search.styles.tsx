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

export const SeeMoreLink = styled.div`
  margin-bottom: 4px;
  /* justify-content: right; */
  text-align: right;
  cursor: pointer;
`;

export const SearchPageCol = styled(Col)`
  /* align-items: center; */
  align-content: center;
  justify-content: center;
`;

export const SearchPageRow = styled(Row)`
  align-content: center;
  /* justify-content: center; */
  justify-content: left;
  /* margin: 1em; */
`;

export const CenteredSearchPageRow = styled(Row)`
  justify-content: center;
  padding: 1rem;
`;

export const SearchBarContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 28rem;
  max-width: 80vw;
  height: 3.8em;
  background-color: transparent;
  padding-top: 4px;
  overflow: hidden;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
`;

export const SearchInputContainer = styled(InputGroup)`
  width: 100%;
  /* min-height: 4em; */
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
  padding-left: 0px;
  padding-right: 0px;
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
  background-color: transparent;
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
  &:hover {
    background-color: #a663cc;
  }
  &:focus {
    background-color: #a663cc;
  }
`;

export const StyledTabs = styled(Tabs)`
  --bs-nav-tabs-border-color: #6a1d7d;
  --bs-nav-tabs-link-hover-border-color: #6a1d7d;
  /* --bs-nav-tabs-link-active-bg: black; */
  --bs-nav-tabs-link-active-bg: #6a1d7d;
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
