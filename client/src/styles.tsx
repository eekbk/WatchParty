// File for styling components
import styled from 'styled-components';
import {
  Button, Form, Container, Card,
} from 'react-bootstrap';
// const { Title, Body, Img, Text } = Card;
// const { Group } = Form;
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
	}
	&::-webkit-scrollbar {
		width: 20px;
		opacity: 0;
	}
	&:hover {
		&::-webkit-scrollbar-thumb {
			background: #021ffa;
			opacity: 1;
			border-radius: 10px;
			&:active {
				box-shadow: inset 0px 0px 10px red;
			}
		}
		&::-webkit-scrollbar {
			background: #ff6700;
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

export const StyledBackgroundContainer = styled(Container)`
	background-color: #8a25e2;
	height: 100vh;
	flex-flow: flow wrap;
`;

export const PlayPause = styled(Button)`
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
