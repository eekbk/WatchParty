import axios from 'axios';
import { useContext, useEffect } from 'react';
import {
  Container, Card, CardGroup, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModCard from './ModCard';
// import FollowButton from '../../buttons/FollowButton';
// import { playlist } from '../../../../server/routes/playlist';
import { SearchContext } from '../../contexts/searchContext';
// import { UserContext } from '../../context';
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
  const navigate = useNavigate();

  // const [view, setView] = useState('searchResults');
  useEffect(() => {
    console.log('is this doing anything????');
    // console.log('user.following.length:', user.following.length);
    // console.log('user.followers.length:', user.followers.length);
  }, [user]);

  const handleCardClick = (party, kind) => {
    // reroute to watchParty specific watchParty
    console.log(
      `what is passed in as 'party' when kind is '${kind}': ${JSON.stringify(
        party,
      )}`,
    );
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
      console.log(user);
      // send an axios request to get the user data
      // navigate over to a profile page sort of page for the person
    }
  };

  // handle the follow click
  // const handleFollowClick = (userMatch) => {
  //   // if the other user is not already followed
  //   if (!user.following.includes(userMatch.id)) {
  //     axios.post('api/user/follow', { followerId: user.id, followedId: userMatch.id })
  //       .then(() => {
  //         console.log('Nailed IT!');
  //       })
  //       .catch((err) => {
  //         console.error('error in old FollowClick:\n', err);
  //       });
  //   }
  //   // send an axios request to follow the other user
  //   // otherwise
  // };

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
              <>
                {/* <Card
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
                    {/* <Button
                    onClick={() =>
                      handleFollowClick(userMatch)}>{user.following.includes(userMatch.id)
                    ? 'Unfollow' : 'Follow' }</Button> */}
                {/* <Button>DM</Button>
                    <FollowButton otherUserId={userMatch.id} />
                  </Card.Footer>
                </Card> */}
                <ModCard
                  obj={userMatch}
                  kind="user"
                  handleCardClick={handleCardClick}
                />
              </>
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
