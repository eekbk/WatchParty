import axios from 'axios';
import { useContext } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModCard from './ModCard';
// import FollowButton from '../../buttons/FollowButton';
// import { playlist } from '../../../../server/routes/playlist';
import { SearchContext } from '../../contexts/searchContext';
// import { UserContext } from '../../context';
import { UserContext } from '../../context';

function Search({ socket }) {
  const {
    usersMatch,
    partiesMatch,
    videosMatch,
    setPartiesMatch,
    setUsersMatch,
    setVideosMatch,
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCardClick = (party, kind) => {
    // console.log('party in search:', party);
    if (kind === 'party') {
      navigate('/watchParty', {
        state: { party },
      });
    } else if (kind === 'video') {
      // send an axios request to find all the rooms with a playlist that contains that video
      axios
        .get(`/api/search/party/${party}`)
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
    } else if (kind === 'user') {
      // TODO LATER
      // send an axios request to get the user data
      // navigate over to a profile page sort of page for the person
    }
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
              <Card
                style={{
                  width: '18rem',
                  padding: '0 auto',
                }}
                onClick={() => handleCardClick(party, 'party')}
              >
                <Card.Img variant="top" src={party.thumbnail} />
                <Card.Body>
                  <Card.Title>{party.name}</Card.Title>
                  <Card.Text>{party.description}</Card.Text>
                </Card.Body>
                {/* <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer> */}
              </Card>
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
                <ModCard
                  obj={userMatch}
                  kind="user"
                  handleCardClick={handleCardClick}
                  socket={socket}
                />
              </Col>
            ))}
        </Row>
      </ul>
      {videosMatch.length ? <h2>Videos</h2> : []}
      <ul>
        {videosMatch.map((video) => (
          <Card
            key={video.id}
            onClick={() => handleCardClick(video.id, 'video')}
          >
            <h3>{video.title}</h3>
            <p>{`${video.description.slice(0, 200)}...`}</p>
          </Card>
        ))}
      </ul>
    </Container>
  );
}

export default Search;
