import axios from 'axios';
import { Col, Row, OverlayTrigger } from 'react-bootstrap';
import {
  StyledVideoCard,
  StyledVideoCardImg,
  StyledVideoTitle,
  StyledCardRow,
  StyledCardCol,
  StyledIsFollowing,
  StyledTooltip,
} from './cards.styles';

function VideoCard({
  video,
  setIsVideoClicked,
  setSelectedVideo,
  setVideoParties,
}) {
  const { thumbnail, title, id, parties } = video;

  const selectVideo = async () => {
    try {
      await setSelectedVideo(video);
      // send an axios request to get all of the parties attached to the video
      const { data } = await axios.get(`/api/video/parties/${id}`);
      await setVideoParties(data);
      await setIsVideoClicked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = () => {
    selectVideo();
  };

  const cardTitle = title.length > 45 ? `${title.slice(0, 45)}...` : title;

  const tooltip = (
    <StyledTooltip id="tooltip">
      Click to see parties featuring this video
    </StyledTooltip>
  );

  return (
    <OverlayTrigger delay={800} placement="top" overlay={tooltip}>
      <StyledVideoCard onClick={handleCardClick}>
        <StyledCardRow className="no-gutters">
          <StyledCardCol sm={3}>
            <StyledVideoCardImg src={thumbnail} />
          </StyledCardCol>
          <Col lg={9} style={{ alignItems: 'space-between', padding: '.5rem' }}>
            <Row>
              <StyledVideoTitle>{cardTitle}</StyledVideoTitle>
            </Row>
            <Row>
              <StyledIsFollowing>
                {parties.length === 1
                  ? `Appears in ${parties.length} video`
                  : `Appears in ${parties.length} videos`}
              </StyledIsFollowing>
            </Row>
          </Col>
        </StyledCardRow>
      </StyledVideoCard>
    </OverlayTrigger>
  );
}

export default VideoCard;
