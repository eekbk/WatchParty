import {
  StyledCloseButton,
  StyledForm,
  StyledVideoCard,
  StyledFormLabel,
  StyledScrollableGroup,
} from './styles';

export function VideoList({ playlist, handleVideoRemoval }) {
  return (
    <StyledForm style={{ marginTop: '10px', width: '20rem' }}>
      <StyledFormLabel style={{ width: '100%', textAlign: 'center' }}>
        Video List
      </StyledFormLabel>
      <StyledScrollableGroup style={{ maxHeight: 'max(22rem, 50vh)' }}>
        {playlist.map((vd, i) => (
          <StyledVideoCard style={{ marginTop: '10px' }}>
            <StyledCloseButton
              onClick={() => handleVideoRemoval(i)}
              style={{ marginTop: '5px', marginLeft: '5px' }}
            />
            <StyledVideoCard.Title
              style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                textAlign: 'center',
              }}
            >
              {vd.title}
            </StyledVideoCard.Title>
            <StyledVideoCard.Body>
              <StyledVideoCard.Img src={vd.thumbnail} />
              <StyledVideoCard.Text>
                {vd.description.slice(0, 150)}
              </StyledVideoCard.Text>
            </StyledVideoCard.Body>
          </StyledVideoCard>
        ))}
      </StyledScrollableGroup>
    </StyledForm>
  );
}
