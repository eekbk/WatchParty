// File for styling components
import styled from 'styled-components';
import { Button, Form, Container, Card, Row, Image } from 'react-bootstrap';
import {
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
// const { Title, Body, Img, Text } = Card;
const { Group } = Form;

/*
since this is wrapping the whole body, we can use it as the basis
for relative sizes ie fonts
*/
// export const StyledBackgroundContainer = styled(Container)`
//   background-color: #8a25e2;
//   height: fit-content;
//   min-height: 100vh;
//   flex-flow: flow wrap;
// `;

export const MainContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: 90px;
  padding-bottom: 35px;
  width: 100%;
`;

export const Header = styled(Container)`
  position: fixed;
  height: 80px;
  top: 0;
  width: 100%;
  background-color: #8a25e2;
  z-index: 2;
  margin: 0px;
  padding-top: 7px;
  box-shadow: 0.8px 0.8px 1.6px rgba(0, 0, 0, 0.02),
    2px 2px 3.8px rgba(0, 0, 0, 0.028), 3.8px 3.8px 7.1px rgba(0, 0, 0, 0.035),
    6.7px 6.7px 12.7px rgba(0, 0, 0, 0.042),
    12.5px 12.5px 23.8px rgba(0, 0, 0, 0.05), 30px 30px 57px rgba(0, 0, 0, 0.07);
  align-items: center;
`;

export const Footer = styled(Container)`
  position: fixed;
  bottom: 0;
  height: 35px;
  /* width: fit-content; */
  min-width: 100vh;
  z-index: 3;
  background-color: #8a25e2;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0.8px 0.8px 1.6px rgba(0, 0, 0, 0.02),
    2px 2px 3.8px rgba(0, 0, 0, 0.028), 3.8px 3.8px 7.1px rgba(0, 0, 0, 0.035),
    6.7px 6.7px 12.7px rgba(0, 0, 0, 0.042),
    12.5px 12.5px 23.8px rgba(0, 0, 0, 0.05), 30px 30px 57px rgba(0, 0, 0, 0.07);
`;

// offcanvas responsive for menus that could be cluttered on mobile?
// scrolling on navbar for when collapsed?
// collapse and fade for wrapping conditionally visible components?
export const StyledVideoCard = styled(Card)`
  background-color: #375915;
  color: #ff30db;
`;
export const StRow = styled(Row)`
  position: absolute;
  bottom: 0.5rem;
  left: 0.8rem;
  opacity: 0;
  width: 100%;
  &:hover {
    opacity: 1;
  }
`;
export const PStRow = styled(Row)`
  position: absolute;
  max-height: 85%;
  top: 0.5rem;
  left: 0.8rem;
  opacity: 0;
  width: 100%;
  &:hover {
    opacity: 1;
  }
`;
export const DmChatBox = styled(Container)`
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 0px 8px 8px 0px;
  text-align: center;
  color: white;
  margin: 0px;
`;
export const ThinScrollBar = styled(Group)`
  &::-webkit-scrollbar-thumb {
    width: 10px;
    opacity: 0;
    box-shadow: inset 0px 0px 5px black;
  }
  &::-webkit-scrollbar {
    width: 10px;
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
export const DmSideBar = styled(Group)`
  color: white;
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 8px 0px 0px 8px;
  text-align: center;
  &::-webkit-scrollbar-thumb {
    width: 10px;
    opacity: 0;
    box-shadow: inset 0px 0px 5px black;
  }
  &::-webkit-scrollbar {
    width: 10px;
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
export const PlayButton = styled(BsPlayCircleFill)`
  opacity: inherit;
  color: #d8d8d8;
`;
export const PauseButton = styled(BsPauseCircleFill)`
  opacity: inherit;
  color: #d8d8d8;
`;
export const NextButton = styled(BsFillArrowRightCircleFill)`
  opacity: inherit;
  color: #d8d8d8;
`;
export const BackButton = styled(BsFillArrowLeftCircleFill)`
  opacity: inherit;
  color: #d8d8d8;
`;
export const VolSlider = styled(Form.Range)`
  &::-webkit-slider-thumb {
    background: #383838 !important;
  }
`;

export const DmUser = styled(Image)`
  position: relative;
  width: 50px;
  height: 50px;
  border: 'solid 2px';
  border-color: white;
  &:hover {
    background-color: transparent;
    border-color: transparent;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border-color: #8a25e2;
  }
`;
export const DmUserContainer = styled(Container)`
  &:hover {
    border-color: #8a25e2;
  }
  &:focus {
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
  background: radial-gradient(ellipse at center, #320e3b, black);
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
