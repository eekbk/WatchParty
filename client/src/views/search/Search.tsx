import { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import UserCard from '../../components/cards/UserCard';
import PartyCard from '../../components/cards/PartyCard';
import VideoCard from '../../components/cards/VideoCard';
import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';
import { CategoryTitle } from '../../styles';
import {
  SearchPageCol,
  SearchPageRow,
  SearchPageHeading,
  SeeMoreLink,
} from './search.styles';
// import VideoCard from '../../cards/VideoCard';

function Search({ socket }) {
  const {
    usersMatch,
    partiesMatch,
    videosMatch,
    // setPartiesMatch,
    // setUsersMatch,
    // setVideosMatch,
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);

  return (
    <Container>
      <SearchPageHeading>
        {!partiesMatch.length && !usersMatch.length && !videosMatch.length ? (
          <CategoryTitle>No Matches Found</CategoryTitle>
        ) : (
          []
        )}
        <Col>
          {partiesMatch.length ? <CategoryTitle>Parties</CategoryTitle> : []}
        </Col>
        <Col>
          <SeeMoreLink>
            {partiesMatch.length > 4 ? 'see more...' : []}
          </SeeMoreLink>
        </Col>
      </SearchPageHeading>
      {/* <ul> */}
      <SearchPageRow>
        {partiesMatch.slice(0, 4).map((party) => (
          <Col xs={3}>
            <PartyCard party={party} />
          </Col>
        ))}
      </SearchPageRow>
      {/* </ul> */}
      <SearchPageRow>
        <SearchPageCol md={6}>
          <SearchPageHeading>
            {/* <Row> */}
            <Col>
              {videosMatch.length ? <CategoryTitle>Videos</CategoryTitle> : []}
            </Col>
            <Col>
              <SeeMoreLink>
                {videosMatch.length > 4 ? 'see more...' : []}
              </SeeMoreLink>
            </Col>
            {/* </Row> */}
          </SearchPageHeading>
          <ul>
            <Col>
              {videosMatch.slice(0, 4).map((video) => (
                <Row xs={3}>
                  <VideoCard video={video} key={video.id} />
                </Row>
              ))}
            </Col>
          </ul>
        </SearchPageCol>
        <SearchPageCol md={6}>
          <SearchPageHeading>
            <Col>
              {usersMatch.length ? <CategoryTitle>Users</CategoryTitle> : []}
            </Col>
            <Col>
              <SeeMoreLink>
                {usersMatch.length > 4 ? 'see more...' : []}
              </SeeMoreLink>
            </Col>
          </SearchPageHeading>
          <ul>
            <Row>
              {usersMatch
                .filter(
                  (match) =>
                    !user.blockers.includes(match.id) &&
                    !user.blocking.includes(match.id)
                )
                .slice(0, 4)
                .map((userMatch) => (
                  <Col md={6}>
                    <UserCard obj={userMatch} socket={socket} />
                  </Col>
                ))}
            </Row>
          </ul>
        </SearchPageCol>
      </SearchPageRow>
    </Container>
  );
}

export default Search;
