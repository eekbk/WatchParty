import {
  Container, Row, Col, Accordion,
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import { useState, useRef } from 'react';
import { StyledForm } from '../styles';

const {
  Label, Text, Control, Group, Check,
} = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const typeaheadRef = useRef(null);
  const [multiSelections, setMultiSelections] = useState([]);
  return (
    <Container fluid="md">
      <Row>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Room Name</Label>
              <Control placeholder="Enter Room Name Here" />
            </Group>
            <Group>
              <Label>Description</Label>
              <Control as="textarea" placeholder="Describe Room Here" />
            </Group>
            <Group>
              <Label>Choose Saved Playlist</Label>
              <Accordion>
                <Item eventKey="0">
                  <Header>Playlist 1</Header>
                  <Body>Info</Body>
                </Item>
                <Item eventKey="1">
                  <Header>Playlist 1</Header>
                  <Body>Info</Body>
                </Item>
                <Item eventKey="2">
                  <Header>Playlist 1</Header>
                  <Body>Info</Body>
                </Item>
              </Accordion>
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Check type="checkbox" label="Archive on End" />
              <Check type="checkbox" label="Save Videos as Playlist" />
              <Check type="checkbox" label="Invite Only" />
            </Group>
            <Group>
              <Label>Invite friends to watch party</Label>
              <Typeahead
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
								  setMultiSelections(selected);
								  // Keep the menu open when making multiple selections.
								  typeaheadRef.current.toggleMenu();
                }}
                options={['options', 'sfjvnskfnv', 'whjbvsvvwjfnjw']}
                placeholder="Invite friends"
                ref={typeaheadRef}
                selected={multiSelections}
                renderToken={(option: any, { onRemove }, index) => (
                  <Token key={index} onRemove={onRemove} option={option}>
                    {`@${option}`}
                  </Token>
                )}
              />
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Video Url</Label>
              <Control placeholder="Paste Url Here" />
              <Text>Choose a youtube video to add</Text>
            </Group>
          </StyledForm>
        </Col>
      </Row>
    </Container>
  );
}
