// File for styling components
import styled from 'styled-components';
import { Button, Form, Container, Card } from 'react-bootstrap';
import {
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
// const { Title, Body, Img, Text } = Card;
const { Group } = Form;
// offcanvas responsive for menus that could be cluttered on mobile?
// scrolling on navbar for when collapsed?
// collapse and fade for wrapping conditionally visible components?
export const StyledVideoCard = styled(Card)`
  background-color: #375915;
  color: #ff30db;
`;

export const PlayButton = styled(BsPlayCircleFill)`
  color: #d8d8d8;
`;
export const PauseButton = styled(BsPauseCircleFill)`
  color: #d8d8d8;
`;
export const NextButton = styled(BsFillArrowRightCircleFill)`
  color: #d8d8d8;
`;
export const BackButton = styled(BsFillArrowLeftCircleFill)`
  color: #d8d8d8;
`;
export const VolSlider = styled(Form.Range)`
  &::-webkit-slider-thumb {
    background: #383838 !important;
  }
`;

export const DmUser = styled(Button)`
  color: #ffff;
  background-color: transparent;
  border-color: transparent;
  &:hover {
    background-color: transparent;
    border-color: transparent;
  }
  &:active:focus {
    outline: none;
    box-shadow: none;
    background-color: transparent;
  }
  &:active {
    outline: none;
    box-shadow: none;
    background-color: transparent;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border-color: #8a25e2;
  }
`;

export const StyledButton = styled(Button)`
  color: #ffed5d;
  background-color: #ff30db;
  border-color: #8a25e2;
  &:hover {
    background-color: #8a25e2;
    border-color: #8a25e2;
  }
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
`;

export const StyledForm = styled(Form)`
  background-color: #95ef23;
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
  background-color: #8a25e2;
  height: fit-content;
  min-height: 100vh;
  flex-flow: flow wrap;
`;

export const LButton = styled(Button)`
  color: white;
  background-color: transparent;
  border-color: transparent;
  &:hover {
    background-color: transparent;
    border-color: #8a25e2;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: #8a25e2;
    border-color: transparent;
  }
  &:active {
    outline: orange;
    box-shadow: transparent;
    background-color: #8a25e2;
    border-color: transparent;
  }

  &:active:focus {
    outline: none;
    box-shadow: none;
    background-color: #8a25e2;
  }
`;
