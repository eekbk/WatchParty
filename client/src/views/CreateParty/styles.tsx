import styled from 'styled-components';
import {
  Button,
  Form,
  Container,
  Card,
  Accordion,
  Row,
  Col,
  CloseButton,
  Alert,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';

const { Item, Header, Body } = Accordion;
const { Label, Text, Control, Group, Check } = Form;

const disabledForm = '#e9ecef';

const primary = '#320E3B';
const secondary = '#A663CC';
const tertiary = '#48AcF0';
const accent = '#15616D';
const text = '#E5F4E3';

export const CreatePartyContainer = styled(Container)``;
export const StyledImageContainer = styled(Container)``;

export const StyledTypeahead = styled(Typeahead)`
  .rbt-input-multi.disabled {
    cursor: default;
  }
`;

export const StyledToken = styled(Token)``;

export const StyledRow = styled(Row)`
  justify-content: center;
`;

export const StyledCol = styled(Col)``;
export const StyledCloseButton = styled(CloseButton)``;
export const StyledAlert = styled(Alert)``;

export const HeaderRow = styled(Row)`
  justify-content: center;
`;

export const HeaderColumn = styled(Col)`
  text-align: center;
`;

export const StyledTabs = styled(Tabs)`
  --bs-nav-tabs-link-active-bg: #320e3b;
  --bs-nav-tabs-link-active-color: white;
  .nav-link {
    color: white;
  }
`;

export const StyledTab = styled(Tab)``;

export const StyledAccordionItem = styled(Item)``;

export const StyledAccordionHeader = styled(Header)``;

export const StyledAccordionBody = styled(Body)``;

export const StyledVideoCard = styled(Card)`
  background: rgba(94, 48, 121, 0.25);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 48, 121, 0.3);
`;

export const StyledButton = styled(Button)`
  position: relative;
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
    background: linear-gradient(${primary}, ${secondary});
  }
  color: ${text};
  background-color: ${tertiary};
  border-color: ${accent};
  &:active:focus {
    outline: none;
    box-shadow: none;
    background-color: #8a25e2;
  }
  &:active {
    outline: none;
    box-shadow: none;
    background-color: #8a25e2;
  }
  &:focus {
    outline: black solid 2px;
  }
  &:disabled {
    color: white;
    border: none;
  }
`;

export const StyledForm = styled(Form)`
  color: ${text};
  padding: 10px;
  border-radius: 16px;
`;

export const StyledFormLabel = styled(Label)`
  color: ${text};
`;

export const StyledFormText = styled(Text)`
  color: ${text};
`;

export const StyledFormControl = styled(Control)``;

export const StyledFormGroup = styled(Group)`
  color: ${text};
`;

export const StyledFormCheck = styled(Check)`
  color: ${text};
  .form-check-input {
    &:checked {
      background-color: #44087b;
    }
  }
`;

export const StyledFormTextarea = styled(Control)`
  resize: none;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  &:disabled {
    background-color: ${disabledForm};
  }
`;

export const StyledScrollableGroup = styled(Group)`
  overflow-y: auto;
`;
