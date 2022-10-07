// File for styling components
import styled from 'styled-components';
import {
  Button, Form, Container, Card,
} from 'react-bootstrap';
// const { Title, Body, Img, Text } = Card;

export const StyledVideoCard = styled(Card)`
	background-color: #375915;
	color: #ff30db;
`;

export const StyledButton = styled(Button)`
	color: #ffed5d;
	background-color: #8a25e2;
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
`;

export const StyledBackgroundContainer = styled(Container)`
	background-color: #ff30db;
	height: 100vh;
`;

export const PlayPause = styled(Button)`
	color: white;
	background-color: #8a25e2;
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
