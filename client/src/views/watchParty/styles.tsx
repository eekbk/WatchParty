import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

const { Item } = ListGroup;

// let primary;
// let secondary;
// let tertiary;
// let accent;
let text;
// const disabledForm = '#e9ecef';

// Preferred
// primary = '#320E3B';
// secondary = '#A663CC';
// tertiary = '#48AcF0';
// accent = '#15616D';
text = '#E5F4E3';

export const StyledListGroup = styled(ListGroup)``;

export const StyledListItem = styled(Item)`
  border: none;
  background: transparent;
  color: ${text};
`;

export const StyledParticipant = styled(Item)`
  background: rgba(28, 7, 47, 0.75);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 48, 121, 0.3);
  color: ${text};
  .form-check-input:checked {
    border-color: #44087b;
    background-color: #44087b;
  }
  .form-check-input {
    &:active:focus {
      outline: black solid 2px;
      box-shadow: none;
    }
    &:active {
      outline: black solid 2px;
      box-shadow: none;
    }
    &:focus {
      outline: black solid 2px;
      box-shadow: none;
    }
  }
`;

export const StyledListHeader = styled('p')`
  background: rgba(28, 7, 47, 0.75);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(94, 48, 121, 0.3);
  color: ${text};
  margin: 0px;
  margin-bottom: 5px;
  text-align: center;
  width: fit-content;
  padding: 8px;
  display: flex;
  align-self: center;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
