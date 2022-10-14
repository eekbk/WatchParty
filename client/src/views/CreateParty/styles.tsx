import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const StyledForm = styled(Form)`
	background-color: transparent;
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

export const UnStyledForm = styled(Form)`
	background-color: transparent;
	padding: 3%;
`;
