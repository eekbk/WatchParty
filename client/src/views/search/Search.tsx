import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Container, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/cards/UserCard';
import PartyCard from '../../components/cards/PartyCard';
import VideoCard from '../../components/cards/VideoCard';
import Paginator from '../../components/buttons/Paginator';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';
import {
  StyledRow,
  StyledTabs,
  StyledTab,
  SearchPageRow,
  SearchTabContainer,
  SearchPageHeading,
  CenteredSearchPageRow,
  StyledLeftRow,
  StyledATag,
} from './search.styles';

function Search() {
  const [usersMatch, setUsersMatch] = useState([]);
  const [partiesMatch, setPartiesMatch] = useState([]);
  const [videosMatch, setVideosMatch] = useState([]);
  const [userStartIndex, setUserStartIndex] = useState(0);
  const [partyStartIndex, setPartyStartIndex] = useState(0);
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoParties, setVideoParties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [key, setKey] = useState('parties');
  const { user } = useContext(UserContext);
  const { voiceKey, setVoiceKey } = useContext(VoiceContext);
  const { q } = useParams();
  const readableQ = q.replace(/&/g, ' ');

  useEffect(() => {
    setIsLoading(true);
    // do the axios search
    axios
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  }, [q, partyStartIndex]); // i did remove 'user' from here in case something breaks, add it back!

  useEffect(() => {
    if (!partiesMatch.length && !videosMatch.length) {
      setVoiceKey('users');
      setKey('users');
    } else if (!partiesMatch.length) {
      setVoiceKey('videos');
      setKey('videos');
    } else {
      setVoiceKey('parties');
      setKey('parties');
    }
  }, [videosMatch, partiesMatch, usersMatch]);

  useEffect(() => {
    if (voiceKey !== key) {
      setKey(voiceKey);
    }
  }, [voiceKey]);

  // watch out for searches while we are on videos page
  useEffect(() => {
    setIsVideoClicked(false);
  }, [videosMatch, partiesMatch, usersMatch]);

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
    <div>
      {!usersMatch.length &&
      !partiesMatch.length &&
      !videosMatch.length &&
      !isLoading ? (
        <SearchPageHeading>
          No matches for &quot;
          {readableQ}
          &quot;
        </SearchPageHeading>
      ) : !partiesMatch.length && !usersMatch.length && !videosMatch.length ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            color: '#A663CC',
            position: 'absolute',
            left: '50%',
            top: '50vh',
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container>
          {isVideoClicked ? (
            <>
              <StyledLeftRow>
                <StyledATag onClick={() => setIsVideoClicked(false)}>
                  back to search results
                </StyledATag>
              </StyledLeftRow>
              <SearchPageHeading>
                Parties featuring &quot;
                {selectedVideo.title}
                &quot;:
              </SearchPageHeading>
              <CenteredSearchPageRow>
                {partiesRender(videoParties)}
              </CenteredSearchPageRow>
            </>
          ) : (
            <StyledRow>
              <StyledTabs
                id="search-results-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                {partiesMatch.length ? (
                  <StyledTab eventKey="parties" title="Parties">
                    <SearchTabContainer>
                      <SearchPageRow>
                        {partiesRender(partiesMatch)}
                      </SearchPageRow>
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
                ) : null}
                {usersMatch.length ? (
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
                              <UserCard obj={userMatch} />
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
                ) : null}
                {videosMatch.length ? (
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
                          startIndexSetter={setVideoStartIndex}
                        />
                      ) : null}
                    </SearchTabContainer>
                  </StyledTab>
                ) : null}
              </StyledTabs>
            </StyledRow>
          )}
        </Container>
      )}
    </div>
  );
}

export default Search;
