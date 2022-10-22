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
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';

const { Item, Header, Body } = Accordion;
const { Label, Text, Control, Group, Check } = Form;

let primary;
let secondary;
let tertiary;
let accent;
let text;
const disabledForm = '#e9ecef';

// Preferred
primary = '#320E3B';
secondary = '#A663CC';
tertiary = '#48AcF0';
accent = '#15616D';
text = '#E5F4E3';

// Dial Up the Warmth
// primary = '#320E3B';
// secondary = '#006E90';
// tertiary = '#EB9486';
// accent = '#3E7CB1';
// text = '#5DFDCB';

// Errant Mind
// primary = '#320E3B';
// secondary = '#E6AF2E';
// tertiary = '#99B2DD';
// accent = '#306B34';
// text = '#DB2955';

// Contrast Primaria
// primary = '#320E3B';
// secondary = '#F6F740';
// tertiary = '#0496FF';
// accent = '#548C2F';
// text = '#D81159';

// Fashionable Ocean
// primary = '#320E3B';
// secondary = '#69FFF1';
// tertiary = '#63D471';
// accent = '#63A46C';
// text = '#6A7152';

// Ocean But With Pink Accenting!
// primary = '#320E3B';
// secondary = '#69FFF1';
// tertiary = '#63D471';
// accent = '#14342B';
// text = '#FF579F';

// Coral Theft
// primary = '#320E3B';
// secondary = '#FDFFFC';
// tertiary = '#FB8B24';
// accent = '#CB769E';
// text = '#273C2C';

// Flesh Miasma
// primary = '#320E3B';
// secondary = '#C78283';
// tertiary = '#F3D9DC';
// accent = '#D7BEA8';
// text = '#B49286';

// Hotel Drabbery
// primary = '#320E3B';
// secondary = '#D3D4D9';
// tertiary = '#4B88A2';
// accent = '#BB0A21';
// text = '#FFF9FB';

// The Wrong Answer
// primary = '#320E3B';
// secondary = '#FFB86F';
// tertiary = '#E0CA3C';
// accent = '#BA5C12';
// text = '#C1292E';

export const StyledContainer = styled(Container)``;
export const StyledImageContainer = styled(Container)``;
export const StyledTypeahead = styled(Typeahead)``;
export const StyledToken = styled(Token)``;
export const StyledRow = styled(Row)``;
export const StyledCol = styled(Col)``;
export const StyledCloseButton = styled(CloseButton)``;
export const StyledAlert = styled(Alert)``;

export const StyledAccordion = styled(Accordion)`
  &::-webkit-scrollbar-thumb {
    width: 20px;
    opacity: 0;
    box-shadow: inset 0px 0px 5px black;
  }
  &::-webkit-scrollbar {
    width: 20px;
    opacity: 0;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #7d7d7d;
      opacity: 1;
      border-radius: 10px;
      &:active {
        border: 1px solid white;
      }
    }
    &::-webkit-scrollbar {
      background: #3f3f3f;
      opacity: 1;
      border-radius: 10px;
    }
  }
`;

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
`;

export const StyledForm = styled(Form)`
  background-color: ${secondary};
  color: ${text};
  padding: 3%;
  &::-webkit-scrollbar-thumb {
    width: 20px;
    opacity: 0;
    box-shadow: inset 0px 0px 5px black;
  }
  &::-webkit-scrollbar {
    width: 20px;
    opacity: 0;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #7d7d7d;
      opacity: 1;
      border-radius: 10px;
      &:active {
        border: 1px solid white;
      }
    }
    &::-webkit-scrollbar {
      background: #3f3f3f;
      opacity: 1;
      border-radius: 10px;
    }
  }
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

// This is how you turn off the scrollbar in case you want to make your own:
// &::-webkit-scrollbar {
// 	display: none;
// }
// This is how you make your own:
// https://www.w3schools.com/HOWTO/howto_css_custom_scrollbar.asp
// https://levelup.gitconnected.com/build-on-hover-custom-scrollbar-in-react-d846194a7ea4

export const StyledScrollableGroup = styled(Group)`
  &::-webkit-scrollbar-thumb {
    width: 20px;
    opacity: 0;
    box-shadow: inset 0px 0px 5px black;
  }
  &::-webkit-scrollbar {
    width: 20px;
    opacity: 0;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #7d7d7d;
      opacity: 1;
      border-radius: 10px;
      &:active {
        border: 1px solid white;
      }
    }
    &::-webkit-scrollbar {
      background: #3f3f3f;
      opacity: 1;
      border-radius: 10px;
    }
  }
`;

export const StyledBackgroundContainer = styled(Container)`
  background-color: ${primary};
  height: fit-content;
  min-height: 100vh;
  flex-flow: flow wrap;
`;
