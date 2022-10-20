import axios from 'axios';
import { useContext } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import UserCard from '../../cards/UserCard';
import PartyCard from '../../cards/PartyCard';
import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';

function Search() {
  const {
    usersMatch,
    partiesMatch,
    videosMatch,
    setPartiesMatch,
    setUsersMatch,
    setVideosMatch,
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);

  const handleCardClick = (videoId) => {
    axios
      .get(`/api/search/party/${videoId}`)
      .then(({ data }) => {
        const matchingParties = data.playlists
          .map((playlist) => playlist.parties)
          .flat();
        setPartiesMatch(matchingParties);
      })
      .then(() => {
        setUsersMatch([]);
      })
      .then(() => {
        setVideosMatch([]);
      })
      .catch((err) => {
        console.error('The error from handleCardClick:\n', err);
      });
  };

  return (
    <Container>
      {!partiesMatch.length && !usersMatch.length && !videosMatch.length ? (
        <h2>No Matches Found</h2>
      ) : (
        []
      )}
      {partiesMatch.length ? <h2>Parties</h2> : []}
      <ul>
        <Row>
          {partiesMatch.slice(0, 5).map((party) => (
            <Col xs={3}>
              <PartyCard party={party} />
            </Col>
          ))}
        </Row>
      </ul>
      {usersMatch.length ? <h2>Users</h2> : []}
      <ul>
        <Row>
          {usersMatch
            .filter(
              (match) =>
                !user.blockers.includes(match.id) &&
                !user.blocking.includes(match.id)
            )
            .slice(0, 5)
            .map((userMatch) => (
              <Col xs={3}>
                <UserCard obj={userMatch} />
              </Col>
            ))}
        </Row>
      </ul>
      {videosMatch.length ? <h2>Videos</h2> : []}
      <ul>
        {videosMatch.map((video) => (
          <Card key={video.id} onClick={() => handleCardClick(video.id)}>
            <h3>{video.title}</h3>
            <p>{`${video.description.slice(0, 200)}...`}</p>
          </Card>
        ))}
      </ul>
    </Container>
  );
}

export default Search;
