import axios from 'axios';
import { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { playlist } from '../../../../server/routes/playlist';
import { SearchContext } from '../../contexts/searchContext';

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
    if (kind === 'party') {
      navigate('/watchParty', { state: { party } });
    } else if (kind === 'video') {
      console.log('the quote unquote party\n', party);
      // send an axios request to find all the rooms with a playlist that contains that video
      axios
        .get(`/api/search/party/${party}`)
        .then(({ data }) => {
          console.log('The data from the get request:\n', data);
          const matchingParties = data.playlists
            .map((playlist) => playlist.parties)
            .flat();
          console.log('matchingParties:\n', matchingParties);
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
    }
  };

  // const renderView = () => {
  //   if (view === 'searchResults') {
  //     return (
  //       <Container>
  //         {!partiesMatch.length && !usersMatch.length && !videosMatch.length ? (
  //           <h2>No Matches Found</h2>
  //         ) : (
  //           []
  //         )}
  //         {partiesMatch.length ? <h2>Parties</h2> : []}
  //         <ul>
  //           {partiesMatch.map((party) => (
  //             <Card key={party.id} onClick={() => handleCardClick(party, 'party')}>
  //               <h3>{party.name}</h3>
  //               <p>{party.description}</p>
  //             </Card>
  //           ))}
  //         </ul>
  //         {usersMatch.length ? <h2>Users</h2> : []}
  //         <ul>
  //           {usersMatch.map((user) => (
  //             <Card key={user.id} onClick={() => handleCardClick(user.id, 'user')}>
  //               <h3>{user.user_name}</h3>
  //               <h4>
  //                 followers:
  //                 {user.follows}
  //               </h4>
  //             </Card>
  //           ))}
  //         </ul>
  //         {videosMatch.length ? <h2>Videos</h2> : []}
  //         <ul>
  //           {videosMatch.map((video) => (
  //             <Card
  //               key={video.id}
  //               onClick={() => handleCardClick(video.id, 'video')}
  //             >
  //               <h3>{video.title}</h3>
  //               <p>{`${video.description.slice(0, 200)}...`}</p>
  //             </Card>
  //           ))}
  //         </ul>
  //       </Container>
  //     );
  //   } if (view === 'videoClick') {

  //   }
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
        {partiesMatch.map((party) => (
          <Card key={party.id} onClick={() => handleCardClick(party, 'party')}>
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
            <p>{`${video.description.slice(0, 200)}...`}</p>
          </Card>
        ))}
      </ul>
    </Container>
  );
}

export default Search;
