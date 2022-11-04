import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { /* useNavigate, */ useParams } from 'react-router-dom';
import UserCard from '../../components/cards/UserCard';
import PartyCard from '../../components/cards/PartyCard';
import VideoCard from '../../components/cards/VideoCard';
import Paginator from '../../components/buttons/Paginator';
// import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';
// import { CategoryTitle } from '../../styles';
import {
  // StyledCol,
  StyledRow,
  StyledTabs,
  StyledTab,
} from '../CreateParty/styles';
import {
  // SearchPageCol,
  SearchPageRow,
  // SearchPageHeading,
  // SeeMoreLink,
} from './search.styles';
// import VideoCard from '../../cards/VideoCard';

function Search({ socket }) {
  const [usersMatch, setUsersMatch] = useState([]);
  const [partiesMatch, setPartiesMatch] = useState([]);
  const [videosMatch, setVideosMatch] = useState([]);
  const [userStartIndex, setUserStartIndex] = useState(0);
  const [partyStartIndex, setPartyStartIndex] = useState(0);
  const [videoStartIndex, setVideoStartIndex] = useState(0);

  const [key, setKey] = useState('parties');
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  const { q } = useParams();

  useEffect(() => {
    // do the axios search
    console.log('partyStartIndex:', partyStartIndex);
    axios
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  }, [q, user, partyStartIndex]);

  const paginate = (number, startIndexSetter) => {
    console.log('er we in paginate');
    console.log('partyStartIndex before', partyStartIndex);
    console.log('number we changing it to:', number);
    startIndexSetter(number);
    console.log('partyStartIndex after', partyStartIndex);
  };

  console.log('partiesMatch:', partiesMatch);

  return (
    <Container>
      <StyledRow>
        <StyledTabs
          id="search-results-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <StyledTab eventKey="parties" title="Parties">
            <SearchPageRow>
              {partiesMatch
                .filter((party) => {
                  const creator = party.users.filter(
                    (u) => u.role === 'CREATOR'
                  )[0];
                  return (
                    !user.blockers.includes(creator.id) &&
                    !user.blocking.includes(creator.id)
                  );
                })
                .slice(partyStartIndex, partyStartIndex + 8)
                .map((party) => (
                  <Col xs={3}>
                    <PartyCard party={party} />
                  </Col>
                ))}
            </SearchPageRow>
            <Paginator
              resultsPerPage={8}
              totalResults={partiesMatch.length}
              // paginate={paginate}
              startIndexSetter={setPartyStartIndex}
            />
          </StyledTab>
          <StyledTab eventKey="users" title="Users">
            {usersMatch
              .filter(
                (match) =>
                  !user.blockers.includes(match.id) &&
                  !user.blocking.includes(match.id)
              )
              .slice(userStartIndex, userStartIndex + 12)
              .map((userMatch) => (
                <Col md={6}>
                  <UserCard obj={userMatch} socket={socket} />
                </Col>
              ))}
          </StyledTab>
          <StyledTab eventKey="videos" title="Videos">
            {videosMatch
              .slice(videoStartIndex, videoStartIndex + 12)
              .map((video) => (
                <Row xs={3}>
                  <VideoCard video={video} key={video.id} />
                </Row>
              ))}
          </StyledTab>
        </StyledTabs>
      </StyledRow>
    </Container>
  );
}

export default Search;
