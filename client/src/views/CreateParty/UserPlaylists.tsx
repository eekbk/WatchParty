import {
  StyledForm,
  StyledButton,
  StyledVideoCard,
  StyledFormLabel,
  StyledScrollableGroup,
} from './styles';

export function UserPlaylists({ user, setPlaylist, playlist }) {
  return (
    <StyledForm style={{ marginTop: '10px', width: '20rem' }}>
      <StyledFormLabel style={{ width: '100%', textAlign: 'center' }}>
        Import Playlist
      </StyledFormLabel>
      <StyledScrollableGroup style={{ maxHeight: 'max(22rem, 50vh)' }}>
        {user.playlists.map((pl, i) => (
          <StyledVideoCard style={{ marginTop: '10px' }}>
            <StyledVideoCard.Title
              style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '1rem',
                textAlign: 'center',
              }}
            >
              {pl.name}
            </StyledVideoCard.Title>
            <StyledVideoCard.Body>
              <StyledVideoCard.Img src={pl.thumbnail} />
              <StyledVideoCard.Text>
                {pl.description.slice(0, 150)}
              </StyledVideoCard.Text>
              <StyledButton
                style={{ marginTop: '5px' }}
                onClick={() => {
                  setPlaylist(
                    playlist.concat(pl.videos.sort((a, b) => a.index - b.index))
                  );
                }}
                variant="outline-dark"
              >
                Import
              </StyledButton>
            </StyledVideoCard.Body>
          </StyledVideoCard>
        ))}
      </StyledScrollableGroup>
    </StyledForm>
  );
}
