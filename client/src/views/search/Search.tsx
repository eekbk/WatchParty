import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import { /* useNavigate, */ useParams } from 'react-router-dom';
import UserCard from '../../components/cards/UserCard';
import PartyCard from '../../components/cards/PartyCard';
import VideoCard from '../../components/cards/VideoCard';
import Paginator from '../../components/buttons/Paginator';
// import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';
// import { CategoryTitle } from '../../styles';
import {
  StyledRow,
  StyledTabs,
  StyledTab,
  SearchPageRow,
  SearchTabContainer,
  SearchPageHeading,
  SearchPageCol,
  CenteredSearchPageRow,
} from './search.styles';
import { StyledGlassButton } from '../../components/buttons/buttons.styles';

function Search({ socket }) {
  const [usersMatch, setUsersMatch] = useState([]);
  const [partiesMatch, setPartiesMatch] = useState([]);
  const [videosMatch, setVideosMatch] = useState([]);
  const [userStartIndex, setUserStartIndex] = useState(0);
  const [partyStartIndex, setPartyStartIndex] = useState(0);
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoParties, setVideoParties] = useState([]);

  const [key, setKey] = useState('parties');
  const { user } = useContext(UserContext);
  const { voiceKey /* setVoiceKey */ } = useContext(VoiceContext);
  // const navigate = useNavigate();
  const { q } = useParams();

  useEffect(() => {
    // do the axios search
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

  useEffect(() => {
    if (voiceKey !== key) {
      setKey(voiceKey);
    }
  }, [voiceKey]);

  // watch out for searches while we are on videos page
  useEffect(() => {
    setIsVideoClicked(false);
  }, [videosMatch, partiesMatch, usersMatch]);

  // console.log('partiesMatch:', partiesMatch);

  const partiesRender = (array) =>
    array
      .filter((party) => {
        const creator = party.users.filter((u) => u.role === 'CREATOR')[0];
        if (user) {
          return (
            !user.blockers.includes(creator.id) &&
            !user.blocking.includes(creator.id)
          );
        }
        return party;
      })
      .slice(partyStartIndex, partyStartIndex + 8)
      .map((party) => (
        <Col xs={3}>
          <PartyCard party={party} />
        </Col>
      ));

  return (
    <Container>
      {isVideoClicked ? (
        <>
          <SearchPageHeading>
            Parties featuring &quot;
            {selectedVideo.title}
            &quot;:
          </SearchPageHeading>
          <SearchPageRow>{partiesRender(videoParties)}</SearchPageRow>
          <CenteredSearchPageRow>
            <SearchPageCol sm={2}>
              <StyledGlassButton onClick={() => setIsVideoClicked(false)}>
                Back
              </StyledGlassButton>
            </SearchPageCol>
          </CenteredSearchPageRow>
        </>
      ) : (
        <StyledRow>
          <StyledTabs
            id="search-results-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <StyledTab eventKey="parties" title="Parties">
              <SearchTabContainer>
                <SearchPageRow>{partiesRender(partiesMatch)}</SearchPageRow>
                {partiesMatch.length > 8 ? (
                  <Paginator
                    resultsPerPage={8}
                    totalResults={partiesMatch.length}
                    // paginate={paginate}
                    startIndexSetter={setPartyStartIndex}
                  />
                ) : null}
              </SearchTabContainer>
            </StyledTab>
            <StyledTab eventKey="users" title="Users">
              <SearchTabContainer>
                <SearchPageRow>
                  {usersMatch
                    .filter((match) => {
                      if (user) {
                        return (
                          !user.blockers.includes(match.id) &&
                          !user.blocking.includes(match.id)
                        );
                      }
                      return match;
                    })
                    .slice(userStartIndex, userStartIndex + 12)
                    .map((userMatch) => (
                      <Col md={3}>
                        <UserCard obj={userMatch} socket={socket} />
                      </Col>
                    ))}
                </SearchPageRow>
                {usersMatch.length > 12 ? (
                  <Paginator
                    resultsPerPage={12}
                    totalResults={usersMatch.length}
                    // paginate={paginate}
                    startIndexSetter={setUserStartIndex}
                  />
                ) : null}
              </SearchTabContainer>
            </StyledTab>
            <StyledTab eventKey="videos" title="Videos">
              <SearchTabContainer>
                <StyledRow>
                  {/* <StyledCol>
                </StyledCol> */}

                  {videosMatch
                    .slice(videoStartIndex, videoStartIndex + 12)
                    .map((video) => (
                      // <Row xs={3}>
                      <Col md={6}>
                        <VideoCard
                          video={video}
                          key={video.id}
                          setIsVideoClicked={setIsVideoClicked}
                          setSelectedVideo={setSelectedVideo}
                          setVideoParties={setVideoParties}
                        />
                      </Col>
                      // </Row>
                    ))}
                </StyledRow>
                {videosMatch.length > 12 ? (
                  <Paginator
                    resultsPerPage={12}
                    totalResults={videosMatch.length}
                    // paginate={paginate}
                    startIndexSetter={setVideoStartIndex}
                  />
                ) : null}
              </SearchTabContainer>
            </StyledTab>
          </StyledTabs>
        </StyledRow>
      )}
    </Container>
  );
}

export default Search;
