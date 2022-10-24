import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SearchContext } from '../../contexts/searchContext';
// import { UserContext } from '../context';
import {
  StyledVideoCard,
  StyledVideoCardImg,
  StyledVideoTitle,
  StyledCardRow,
  StyledCardCol,
  // StyledCardBody,
  // StyledVideoPartyCount,
} from './cards.styles';

// ModCard stands for Modular Card. Hopefully we can reuse it
function VideoCard({ video }) {
  // const { user } = useContext(UserContext);
  const { thumbnail, title /* , parties */ } = video;
  // console.log('here are the props...\nobj:', obj, '\nkind:', kind);
  const { setPartiesMatch, setUsersMatch, setVideosMatch } =
    useContext(SearchContext);

  // const footerText =
  //   parties.length === 1
  //     ? `feat. in ${parties.length} party!`
  //     : `feat. in ${parties.length} parties!`;

  // const [cardTitle, setCardTitle] = useState('');
  // const [cardText, setCardText] = useState('');
  // const [follows, setFollows] = useState(0);
  // const [isFollowing, setIsFollowing] = useState(false);
  // const [isBlocking, setIsBlocking] = useState(false);

  // set the parties count
  // useEffect(() => {
  //   axios.get(`/api/search/party/${video.id}`)
  // }, []);

  const handleCardClick = async () => {
    // console.log(video.parties);
    await setPartiesMatch(video.parties);
    await setUsersMatch([]);
    await setVideosMatch([]);
  };

  const cardTitle = title.length > 100 ? `${title.slice(0, 100)}...` : title;

  // console.log('hello there');
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
