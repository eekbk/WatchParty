// File for styling components
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledButton = styled(Button)`
	color: palevioletred;
	background-color: paleturquoise;
	font-weight: bold;
	border-color: orange;
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
