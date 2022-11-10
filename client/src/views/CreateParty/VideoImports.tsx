import {
  StyledForm,
  StyledButton,
  StyledFormGroup,
  StyledFormControl,
  StyledFormLabel,
} from './styles';

export function VideoImports({
  setVideo,
  video,
  handleVideoAddition,
  setYoutubePlaylist,
  youtubePlaylist,
  handlePlaylistAddition,
}) {
  return (
    <StyledForm style={{ marginTop: '10px', width: '20rem' }}>
      <StyledFormGroup>
        <StyledFormLabel>Youtube Video Url</StyledFormLabel>
        <StyledFormControl
          placeholder="Paste Url Here"
          onChange={(e) => setVideo(e.target.value)}
          value={video}
        />
        <br />
        <StyledButton onClick={handleVideoAddition} variant="outline-dark">
          Add
        </StyledButton>
      </StyledFormGroup>
      <StyledFormGroup style={{ marginTop: '20px' }}>
        <StyledFormLabel>Youtube Playlist Url</StyledFormLabel>
        <StyledFormControl
          placeholder="Paste Url Here"
          onChange={(e) => setYoutubePlaylist(e.target.value)}
          value={youtubePlaylist}
        />
        <br />
        <StyledButton onClick={handlePlaylistAddition} variant="outline-dark">
          Add
        </StyledButton>
      </StyledFormGroup>
    </StyledForm>
  );
}
