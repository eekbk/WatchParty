import styled from 'styled-components';
import {
  Button,
  Form,
  Container,
  Card,
  Row,
  Image,
  Navbar,
  Nav,
  Tabs,
} from 'react-bootstrap';
import {
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from 'react-icons/bs';

const { Group } = Form;
const { Collapse, Brand, Toggle } = Navbar;
const { Link } = Nav;

const primary = '#320E3B';
const secondary = '#A663CC';
const tertiary = '#48AcF0';
const accent = '#15616D';
const text = '#E5F4E3';

export const StyledBackgroundContainer = styled(Container)`
  height: fit-content;
  min-height: 100vh;
  flex-flow: flow wrap;
  box-sizing: border-box;
  color: white;
  .navbar-toggler {
    border: 1px solid white;
  }
  .navbar-dark {
    background: rgba(28, 7, 47, 0.75);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.9px);
    -webkit-backdrop-filter: blur(17.9px);
    border: 1px solid rgba(49, 12, 84, 0.19);
  }
`;

export const MainContent = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: 90px;
  padding-bottom: 35px;
  width: 100%;
  margin: 0 auto;
`;

// Make navbar more opaque
// Add conditional border radius to only show when in small size
// Look up pesudo-selector, two-tone blur
export const Header = styled.header`
  color: white;
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

  // for gradient header, footer
  /* background-color: purple;
	background-image: linear-gradient(#320e3b, black);
  text-shadow: 0px -1px #333; */
`;

export const Footer = styled.footer`
  position: fixed;
  justify-content: right;
  color: white;
  bottom: 0;
  right: 0;
  height: 100px;
  width: 30%;
  z-index: 3;
  background: transparent;
  /* border-radius: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.31); */
  margin: 0;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  /*
  for gradient footer
  background-color: purple;
	background-image: linear-gradient(#320e3b,#6a1d7d);
  text-shadow: 0px -1px #333;
  */
`;

// offcanvas responsive for menus that could be cluttered on mobile?
// collapse and fade for wrapping conditionally visible components?
export const StyledVideoCard = styled(Card)`
  background: rgba(28, 7, 47, 0.75);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 48, 121, 0.3);
  color: ${text};
  padding: 5px;
`;

export const ArchiveGlassCard = styled(Card)`
  color: white;
  height: 18rem;
  width: 18rem;
  backdrop-filter: blur(10px) saturate(50%);
  -webkit-backdrop-filter: blur(10px) saturate(50%);
  background-color: rgba(17, 25, 40, 0);
  border-radius: 12px;
  border: 1px solid #6a1d7d;
`;

export const StRow = styled(Row)`
  position: absolute;
  bottom: 0;
  left: 0.8rem;
  opacity: 0;
  width: 100%;
  opacity: inherit;
  backdrop-filter: blur(10px) saturate(50%);
  -webkit-backdrop-filter: blur(10px) saturate(50%);
  background-color: rgba(17, 25, 40, 0);
`;

export const StContainer = styled(Container)`
  opacity: 0;
  float: left;
  position: absolute;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  top: 0;
  left: 0;
  &:hover {
    opacity: 1;
  }
`;

export const PStRow = styled(Row)`
  position: absolute;
  top: 0;
  left: 0.8rem;
  opacity: 0;
  width: 100%;
  opacity: inherit;
  backdrop-filter: blur(10px) saturate(50%);
  -webkit-backdrop-filter: blur(10px) saturate(50%);
  background-color: rgba(17, 25, 40, 0);
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
  }
  &::-webkit-scrollbar {
    width: 10px;
    opacity: 0;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0px 0px 5px black;
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

export const LikeButton = styled(BsHandThumbsUp)`
  opacity: inherit;
  margin-right: 5px;
  color: #d8d8d8;
`;

export const DislikeButton = styled(BsHandThumbsDown)`
  opacity: inherit;
  margin-right: 3px;
  margin-left: 5px;
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

export const DmUserContainer = styled(Button)`
  border: solid 1px;
  background: rgba(94, 48, 121, 0.25);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 48, 121, 0.3);
  margin-bottom: 4px;
  &:hover {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border-color: #8a25e2;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border-color: #8a25e2;
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
`;

export const StyledButton = styled(Button)`
  position: relative;
  /* display: inline-block; */
  /* padding: 15px 25px; */
  //margin-right: 5px;
  //background-color: purple; /*for compatibility with older browsers*/
  background-image: linear-gradient(#320e3b, #6a1d7d);
  text-shadow: 0px -1px #333;
  border-color: transparent;
  /* border-radius: 30px;
  border-collapse: separate; */
  color: ${text};
  background-color: ${tertiary};
  border-color: ${accent};
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

export const StyledScrollableGroup = styled(Group)``;

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

export const StyledTabs = styled(Tabs)`
  --bs-nav-tabs-link-active-bg: #320e3b;
  --bs-nav-tabs-link-active-color: white;
  .nav-link {
    color: white;
  }
`;

/* https://css.glass
background: rgba(94, 48, 121, 0.25);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(94, 48, 121, 0.3);
*/

export const CategoryTitle = styled.h1`
  font-size: 1.5em;
  /* padding-left: 3%; */
  /* text-align: center; */
  justify-content: left;
`;

export const StyledNavbar = styled(Navbar)``;

export const StyledNav = styled(Nav)``;

export const StyledCollapse = styled(Collapse)``;

export const StyledBrand = styled(Brand)``;

export const StyledToggle = styled(Toggle)``;

export const StyledLink = styled(Link)``;
