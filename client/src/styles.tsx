// File for styling components
import styled from 'styled-components';
import { Button, Form, Container, Card } from 'react-bootstrap';
// const { Title, Body, Img, Text } = Card;
const { Group } = Form;

export const StyledBackgroundContainer = styled(Container)`
  background: radial-gradient(ellipse at center, #320e3b, black);
  height: fit-content;
  min-height: 100vh;
  flex-flow: flow wrap;
  box-sizing: border-box;
  color: white;
`;

export const MainContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: 90px;
  padding-bottom: 35px;
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: fixed;
  height: 70px;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.31);
  z-index: 2;
  margin: 0px;
  justify-content: center;
`;

export const Footer = styled.footer`
  position: fixed;
  color: white;
  bottom: 0;
  height: 35px;
  width: 100%;
  /* min-width: 100vh; */
  z-index: 3;
  background: rgba(0, 0, 0, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.31);
  margin: 0;
  padding: 0;
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  /* box-shadow: 0.8px 0.8px 1.6px rgba(0, 0, 0, 0.02),
    2px 2px 3.8px rgba(0, 0, 0, 0.028), 3.8px 3.8px 7.1px rgba(0, 0, 0, 0.035),
    6.7px 6.7px 12.7px rgba(0, 0, 0, 0.042),
    12.5px 12.5px 23.8px rgba(0, 0, 0, 0.05), 30px 30px 57px rgba(0, 0, 0, 0.07); */
`;

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

export const CategoryTitle = styled.h1`
  font-size: 1.5em;
  /* padding-left: 3%; */
  /* text-align: center; */
  justify-content: left;
`;
