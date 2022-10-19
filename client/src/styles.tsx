// File for styling components
import styled from 'styled-components';
import { Button, Form, Container, Card } from 'react-bootstrap';
// const { Title, Body, Img, Text } = Card;
const { Group } = Form;
// offcanvas responsive for menus that could be cluttered on mobile?
// scrolling on navbar for when collapsed?
// collapse and fade for wrapping conditionally visible components?
export const StyledVideoCard = styled(Card)`
  background-color: #375915;
  color: #ff30db;
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
  background-color: #ff30db;
  border-color: #8a25e2;
  &:hover {
    background-color: #8a25e2;
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

export const Header = styled(Container)`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #8a25e2;
  z-index: 2;
  margin: 0;
`;

export const MainContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: 90px;
  padding-bottom: 30px;
  width: 100%;
`;

export const Footer = styled(Container)`
  position: fixed;
  bottom: 0;
  height: 3rem;
  /* width: fit-content; */
  min-width: 100vh;
  z-index: 3;
  background-color: #8a25e2;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* left: 0;
  right: 0; */
  /* flex-flow: flow wrap; */
`;
