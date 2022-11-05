import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import {
  StyledVideoCard,
  StyledVideoCardImg,
  StyledVideoTitle,
  StyledCardRow,
  StyledCardCol,
  // StyledCardBody,
  // StyledVideoPartyCount,
} from './cards.styles';

function VideoCard({
  video,
  setIsVideoClicked,
  setSelectedVideo,
  setVideoParties,
}) {
  const { thumbnail, title, id } = video;

  const selectVideo = async () => {
    try {
      await setSelectedVideo(video);
      // send an axios request to get all of the parties attached to the video
      const { data } = await axios.get(`/api/video/parties/${id}`);
      console.log('parties from axios:', data);
      await setVideoParties(data);
      await setIsVideoClicked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = () => {
    selectVideo();
  };

  const cardTitle = title.length > 100 ? `${title.slice(0, 100)}...` : title;

  return (
    <StyledVideoCard onClick={handleCardClick}>
      <StyledCardRow className="no-gutters">
        <StyledCardCol sm={4}>
          <StyledVideoCardImg src={thumbnail} />
        </StyledCardCol>
        <Col lg={8}>
          <Row>
            <StyledVideoTitle>{cardTitle}</StyledVideoTitle>
          </Row>
        </Col>
      </StyledCardRow>
    </StyledVideoCard>
  );
}

export default VideoCard;
