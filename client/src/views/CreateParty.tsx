import {
  Container, Row, Col, Accordion,
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { StyledForm, StyledButton } from '../styles';
import { UserContext } from '../context';

const {
  Label, Text, Control, Group, Check,
} = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const { user } = useContext(UserContext);
  const typeaheadRef = useRef(null);
  const [multiSelections, setMultiSelections] = useState([]);
  const [privateR, setPrivateR] = useState(false);
  const [archive, setArchive] = useState(false);
  const [savePlaylist, setSavePlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState(null);
  const [invited, setInvited] = useState([]);
  const [admins, setAdmins] = useState([]);

  const handleCreate = (e) => {
    axios.post('/api/party', {
      party: {},
    });
  };

  const handlePlaylistImport = (pl) => {
    console.log('filler');
  };

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
								{user.playlists.map((pl, i) => (
									<Item eventKey={i}>
										<Header>{pl.title}</Header>
										<Body>{pl.description}</Body>
										<StyledButton onClick={(pl) => handlePlaylistImport(pl)}>
											Import
										</StyledButton>
									</Item>
								))}
							</Accordion>
						</Group>
					</StyledForm>
				</Col>
				<Col fluid="md">
					<StyledForm>
						<Group>
							<Check
  type="checkbox"
  label="Archive on End"
  onChange={(e) => setArchive(e.target.checked)}
							/>
							<Check
  type="checkbox"
  label="Save Videos as New Playlist"
  onChange={(e) => setSavePlaylist(e.target.checked)}
							/>
							<Check
  type="checkbox"
  label="Invite Only"
  onChange={(e) => setPrivateR(e.target.checked)}
							/>
						</Group>
						<Group hidden={privateR}>
							<Label>Invite friends to watch party</Label>
							<Typeahead
  multiple
  id="keep-menu-open"
  onChange={(selected) => {
								  setMultiSelections(selected);
								  // Keep the menu open when making multiple selections.
								  typeaheadRef.current.toggleMenu();
  }}
  options={user.friends}
  placeholder="Invite friends"
  ref={typeaheadRef}
  selected={multiSelections}
  renderToken={(option: any, { onRemove }, index) => (
									<Token key={index} onRemove={onRemove} option={option}>
										{`@${option.username}`}
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
			<Row>
				<StyledButton disabled={playlist.length} onClick={handleCreate}>
					Create
				</StyledButton>
			</Row>
		</Container>
  );
}
