import axios from 'axios';
import { useContext } from 'react';
import {
  Button, Container, Card, CardGroup, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { playlist } from '../../../../server/routes/playlist';
import { SearchContext } from '../../contexts/searchContext';
// import { UserContext } from '../../context';

function Search() {
  const {
    usersMatch,
    partiesMatch,
    videosMatch,
    setPartiesMatch,
    setUsersMatch,
    setVideosMatch,
  } = useContext(SearchContext);
  const navigate = useNavigate();

  // const [view, setView] = useState('searchResults');

  const handleCardClick = (party, kind) => {
    // reroute to watchParty specific watchParty
    console.log(party);
    if (kind === 'party') {
      axios
        .get(`/api/playlist/${party.playlist_id}`)
        .then((videos) => {
          navigate('/watchParty', {
            state: { party: party.id, videos: videos.data },
          });
        })
        .catch((err) => {
          console.error(err);
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
      console.log(party);
      // send an axios request to get the user data
      // navigate over to a profile page sort of page for the person
    }
  };

  // handle the follow click
  const handleFollowClick = () => {
    // send an axios put request to follow the other user
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
        {/* {partiesMatch.map((party) => (
          <Card key={party.id} onClick={() => handleCardClick(party, 'party')}>
            <h3>{party.name}</h3>
            <p>{party.description}</p>
          </Card>
        ))} */}
        <Col>
          <CardGroup>
            {partiesMatch.slice(0, 5).map((party) => (
              <Card
                style={{
								  maxWidth: '18rem',
                }}
                onClick={() => handleCardClick(party, 'party')}
              >
                <Card.Img
                  variant="top"
                  src="https://i.ytimg.com/vi/CtpdMkKvB6U/mqdefault.jpg"
                />
                <Card.Body>
                  <Card.Title>{party.name}</Card.Title>
                  <Card.Text>{party.description}</Card.Text>
                </Card.Body>
                {/* <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer> */}
              </Card>
            ))}
          </CardGroup>
        </Col>
      </ul>
      {usersMatch.length ? <h2>Users</h2> : []}
      <ul>
        {/* {usersMatch.map((user) => (
          <Card key={user.id} onClick={() => handleCardClick(user, 'user')}>
            <h3>{user.user_name}</h3>
            <h4>
              followers:
              {user.follows}
            </h4>
          </Card>
        ))} */}
        <Col>
          <CardGroup>
            {usersMatch.slice(0, 5).map((userMatch) => (
              <Card
                style={{
								  maxWidth: '18rem',
                }}
                onClick={() => handleCardClick(userMatch, 'user')}
              >
                <Card.Img
                  variant="top"
                  src="https://i.ytimg.com/vi/CtpdMkKvB6U/mqdefault.jpg"
                />
                <Card.Body>
                  <Card.Title>{userMatch.user_name}</Card.Title>
                  <Card.Text>{userMatch.follows}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={handleFollowClick}>Follow</Button>
                  <Button>DM</Button>
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>
        </Col>
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
