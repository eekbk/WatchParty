import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

const { Item } = ListGroup;

// let primary;
let secondary;
// let tertiary;
// let accent;
let text;
// const disabledForm = '#e9ecef';

// Preferred
// primary = '#320E3B';
secondary = '#A663CC';
// tertiary = '#48AcF0';
// accent = '#15616D';
text = '#E5F4E3';

export const StyledListGroup = styled(ListGroup)`
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

export const StyledListItem = styled(Item)`
  background-color: ${secondary};
  color: ${text};
`;
