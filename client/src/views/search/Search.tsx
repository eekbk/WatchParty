import { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts/searchContext';

function Search() {
  const { usersMatch, partiesMatch, videosMatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleCardClick = (id, kind) => {
    // reroute to watchParty specific watchParty
    if (kind === 'party') {
      navigate('/watchParty');
      console.log('what the');
    }
    console.log(id);
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
        {partiesMatch.map((party) => (
          <Card
            key={party.id}
            onClick={() => handleCardClick(party.id, 'party')}
          >
            <h3>{party.name}</h3>
            <p>{party.description}</p>
          </Card>
        ))}
      </ul>
      {usersMatch.length ? <h2>Users</h2> : []}
      <ul>
        {usersMatch.map((user) => (
          <Card key={user.id} onClick={() => handleCardClick(user.id, 'user')}>
            <h3>{user.user_name}</h3>
            <h4>
              followers:
              {user.follows}
            </h4>
          </Card>
        ))}
      </ul>
      {videosMatch.length ? <h2>Videos</h2> : []}
      <ul>
        {videosMatch.map((video) => (
          <Card
            key={video.id}
            onClick={() => handleCardClick(video.id, 'video')}
          >
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </Card>
        ))}
      </ul>
    </Container>
  );
}

export default Search;
