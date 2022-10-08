import { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { SearchContext } from '../../contexts/searchContext';

function Search() {
  const { usersMatch, partiesMatch, videosMatch } = useContext(SearchContext);

  return (
		<Container>
			Parties
			<ul>
				{partiesMatch.map((party) => (
					<Card key={party.id}>
						<h3>{party.name}</h3>
						<p>{party.description}</p>
					</Card>
				))}
			</ul>
			Users
			<ul>
				{usersMatch.map((user) => (
					<Card key={user.id}>
						<h3>{user.user_name}</h3>
						<h4>
							followers:
							{user.follows}
						</h4>
					</Card>
				))}
			</ul>
			Videos
			<ul>
				{videosMatch.map((video) => (
					<Card key={video.id}>
						<h3>{video.title}</h3>
						<p>{video.description}</p>
					</Card>
				))}
			</ul>
		</Container>
  );
}

export default Search;
