import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '../../components/cards/UserCard';
import PartyCard from '../../components/cards/PartyCard';
import VideoCard from '../../components/cards/VideoCard';
// import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';
import { CategoryTitle } from '../../styles';
import {
  StyledCol,
  StyledRow,
  StyledTabs,
  StyledTab,
} from '../CreateParty/styles';
import {
  SearchPageCol,
  SearchPageRow,
  SearchPageHeading,
  SeeMoreLink,
} from './search.styles';
// import VideoCard from '../../cards/VideoCard';

function Search({ socket }) {
  const [usersMatch, setUsersMatch] = useState([]);
  const [partiesMatch, setPartiesMatch] = useState([]);
  const [videosMatch, setVideosMatch] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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
      // .then(() => {
      //   navigate('/search');
      // })
      // .then(() => {
      //   setIsLoading(true);
      // })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  }, [q]);

  const seeMore = (category) => {
    if (category === 'parties') {
      navigate('/results/parties', {
        state: { partiesMatch },
      });
    } else if (category === 'users') {
      navigate('/results/users', {
        state: { usersMatch },
      });
    } else if (category === 'videos') {
      navigate('/results/videos', {
        state: { videosMatch },
      });
    }
  };

  const handleSeeMore = (category) => {
    seeMore(category);
  };

  // if there are parties and videos and users it should look one way
  // otherwise if there are only videos and users is should look another way
  // otherwise if there are only users, it should look another way

  const usersResultsColumn = () => (
    // we want to set a variable to the number of users allowed on the page
    // if

    <>
      <SearchPageHeading>
        <Col>
          {usersMatch.length ? <CategoryTitle>Users</CategoryTitle> : []}
        </Col>
        <Col>
          <SeeMoreLink onClick={() => handleSeeMore('users')}>
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
    </>
  );

  return (
    <Container>
      <StyledRow>
        <StyledTabs defaultActiveKey="party">
          <StyledTab eventKey="parties" title="Parties">
            <SearchPageRow>
              {partiesMatch.slice(0, 4).map((party) => (
                <Col xs={3}>
                  <PartyCard party={party} />
                </Col>
              ))}
            </SearchPageRow>
          </StyledTab>
          <StyledTab eventKey="users" title="Users">
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
          </StyledTab>
          <StyledTab eventKey="videos" title="Videos">
            {videosMatch.slice(0, 4).map((video) => (
              <Row xs={3}>
                <VideoCard video={video} key={video.id} />
              </Row>
            ))}
          </StyledTab>
        </StyledTabs>
      </StyledRow>
    </Container>
  );
}

export default Search;
