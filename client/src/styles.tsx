// File for styling components
import styled from 'styled-components';
import { Button, Form, Container } from 'react-bootstrap';

export const StyledButton = styled(Button)`
	color: white;
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
	background-color: lightyellow;
	padding: 3%;
`;

export const StyledBackgroundContainer = styled(Container)`
	background-color: darkseagreen;
	height: 100vh;
`;
