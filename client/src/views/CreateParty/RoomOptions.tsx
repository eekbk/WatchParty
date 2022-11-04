import { Col, Row } from 'react-bootstrap';
import {
  StyledToken,
  StyledTypeahead,
  StyledForm,
  StyledFormCheck,
  StyledFormGroup,
  StyledFormLabel,
  StyledFormControl,
  StyledFormTextarea,
} from './styles';

export function RoomOptions({
  setArchive,
  setSavePlaylist,
  setPrivateR,
  invited,
  user,
  typeaheadRef1,
  privateR,
  admins,
  setAdmins,
  typeaheadRef2,
  setInvited,
  setPlaylistDescription,
  setPlaylistName,
  savePlaylist,
}) {
  return (
    <StyledForm>
      <Row xs={2} xl={3}>
        <Col>
          <StyledFormGroup style={{ marginTop: '10px' }}>
            <StyledFormLabel>Room Options</StyledFormLabel>
            <StyledFormCheck
              type="checkbox"
              label="Archive on End"
              onChange={(e) => setArchive(e.target.checked)}
            />
            <StyledFormCheck
              type="checkbox"
              label="Save Videos as New Playlist"
              onChange={(e) => setSavePlaylist(e.target.checked)}
            />
            <StyledFormCheck
              type="checkbox"
              label="Invite Only"
              onChange={(e) => setPrivateR(e.target.checked)}
            />
          </StyledFormGroup>
        </Col>
        <Col>
          <StyledFormGroup style={{ marginTop: '10px' }}>
            <StyledFormLabel>Assign Admins</StyledFormLabel>
            <StyledTypeahead
              labelKey={(option: any) => option.username}
              multiple
              id="keep-menu-open"
              onChange={(selected: any[]) => {
                setAdmins(selected);
                setInvited(
                  invited.concat(
                    selected.filter(
                      (ad) => !invited.some((inv) => inv.id === ad.id)
                    )
                  )
                );
                typeaheadRef1.current.toggleMenu();
              }}
              options={privateR ? invited : user.tempFollowing}
              placeholder="Enter usernames"
              ref={typeaheadRef1}
              selected={admins}
              renderToken={(option: any, { onRemove }, index) => (
                <StyledToken key={index} onRemove={onRemove} option={option}>
                  {`@${option.username}`}
                </StyledToken>
              )}
            />
          </StyledFormGroup>
        </Col>
        <Col>
          <StyledFormGroup style={{ marginTop: '10px' }}>
            <StyledFormLabel>Invite</StyledFormLabel>
            <StyledTypeahead
              disabled={!privateR}
              labelKey={(option: any) => option.username}
              multiple
              id="keep-menu-open"
              onChange={(selected: any[]) => {
                setInvited(selected);
                setAdmins(
                  admins.filter((adm) =>
                    selected.some((sel) => adm.id === sel.id)
                  )
                );
                // Keep the menu open when making multiple selections.
                typeaheadRef2.current.toggleMenu();
              }}
              options={user.tempFollowing}
              placeholder="Enter usernames"
              ref={typeaheadRef2}
              selected={privateR ? invited : []}
              renderToken={(option: any, { onRemove }, index) => (
                <StyledToken key={index} onRemove={onRemove} option={option}>
                  {`@${option.username}`}
                </StyledToken>
              )}
            />
          </StyledFormGroup>
        </Col>
        <Col>
          <StyledFormGroup style={{ marginTop: '10px' }}>
            <StyledFormLabel>Playlist Title</StyledFormLabel>
            <StyledFormControl
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter Playlist Title"
              disabled={!savePlaylist}
            />
            <br />
          </StyledFormGroup>
          <StyledFormGroup style={{ marginTop: '10px' }}>
            <StyledFormLabel>Description</StyledFormLabel>
            <br />
            <StyledFormTextarea
              onChange={(e) => setPlaylistDescription(e.target.value)}
              as="textarea"
              placeholder="Describe Playlist"
              disabled={!savePlaylist}
            />
          </StyledFormGroup>
        </Col>
      </Row>
    </StyledForm>
  );
}
