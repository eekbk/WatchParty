import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { SearchContext } from '../../contexts/searchContext';
import { UserContext } from '../../context';

function VoiceControl() {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const {
    usersMatch,
    partiesMatch,
    setVideosMatch,
    setUsersMatch,
    setPartiesMatch,
  } = useContext(SearchContext);

  const { user, setUser } = useContext(UserContext);

  const searchRequest = (text) => {
    const q = text.replaceAll(' ', '&').replaceAll(' and ', '&');
    axios
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
      })
      .then(() => {
        navigate('/search');
      })
      .then(() => {
        setSearchVal('');
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  };

  const commands = [
    {
      command: ['Go to *', 'Go back *', 'take me to *', 'take me *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: [
        'turn off mic',
        'stop listening',
        'privacy please',
        'turn voice control off',
      ],
      callback: () => handleVoiceToggle(),
    },
    {
      command: ['clear', 'reset'],
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: ['search for *', 'look for *', 'show me *', 'look up *'],
      callback: (verbalSearch) => setSearchVal(verbalSearch),
    },
    {
      command: ['enter', 'send', 'make it so'],
      callback: () => sendFunc(),
    },
    {
      command: ['follow *'],
      callback: (person) => follow(person),
    },
    {
      command: ['unfollow *'],
      callback: (person) => unFollow(person),
    },
    {
      command: ['block *'],
      callback: (person) => block(person),
    },
    // {
    //   command: ['unBlock *'],
    //   callback: (person) => unBlock(person),
    // },
    {
      command: ['open *', 'start the party called *'],
      callback: (partyName) => partyStart(partyName),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const pages = [
    'home',
    'login',
    'profile',
    'logout',
    'mic check',
    'create party',
  ];
  const urls = {
    home: '/',
    login: '/auth/google',
    logout: '/logout',
    profile: '/profile',
    'mic check': '/miccheck',
    'create party': '/createParty',
  };

  useEffect(() => {
    if (redirectUrl) {
      if (pages.includes(redirectUrl)) {
        navigate(urls[redirectUrl]);
      } else {
        alert('Page not recognized');
      }
    }
  }, [redirectUrl]);

  const sendFunc = () => {
    if (searchVal) {
      searchRequest(searchVal);
      resetTranscript();
    }
  };

  const handleVoiceToggle = async () => {
    if (!listening) {
      await SpeechRecognition.startListening({ continuous: true });
      setIsSwitchOn(true);
    } else {
      await SpeechRecognition.abortListening();
      setIsSwitchOn(false);
      resetTranscript();
    }
  };

  const follow = async (text) => {
    // if you're on the search page,
    // you could filter through the usersmatch for people with the same name
    if (location.pathname === '/search') {
      // console.log('text:', text);
      // filter and map thru the usersmatch, finding the id of the otherUser
      const followTargetId = usersMatch
        .filter((user) => user.user_name === text)
        .map((userObj) => userObj.id)[0];
      // console.log('followTargetId', followTargetId);

      try {
        // send an axios request to add the relationship
        await axios.post('/api/user/follow', {
          followerId: user.id,
          followedId: followTargetId,
        });
        // send a request to update the user
        const newUserData = await axios.get('/api/user');
        await setUser(newUserData.data);
        resetTranscript();
        // hope and pray that the card is listening
      } catch (err) {
        console.error('The error from verbal follow:', err);
      }
    }
  };

  const unFollow = async (text) => {
    // if you're on the search page,
    // you could filter through the usersmatch for people with the same name
    if (location.pathname === '/search') {
      const followTargetId = usersMatch
        .filter((user) => user.user_name === text)
        .map((userObj) => userObj.id)[0];
      try {
        // send an axios request to delete the relationship
        await axios.delete('/api/user/follow', {
          data: { followerId: user.id, followedId: followTargetId },
        });
        const newUserData = await axios.get('/api/user');
        await setUser(newUserData.data);
        resetTranscript();
      } catch (err) {
        console.error('The error from verbal unFollow:', err);
      }
    }
  };

  const block = async (text) => {
    // if you're on the search page,
    // you could filter through the usersmatch for people with the same name
    if (location.pathname === '/search') {
      // console.log('text:', text);
      // filter and map thru the usersmatch, finding the id of the otherUser
      const blockTargetId = usersMatch
        .filter((user) => user.user_name === text)
        .map((userObj) => userObj.id)[0];
      // console.log('followTargetId', followTargetId);

      try {
        // send an axios request to add the relationship
        await axios.post('/api/user/block', {
          blockerId: user.id,
          blockedId: blockTargetId,
        });
        // send a request to update the user
        const newUserData = await axios.get('/api/user');
        await setUser(newUserData.data);
        resetTranscript();
        // hope and pray that the card is listening
      } catch (err) {
        console.error('The error from verbal block:', err);
      }
    }
  };

  const partyStart = (text) => {
    if (location.pathname === '/search') {
      // filter through parties to find the one where the name prop matches the text
      const party = partiesMatch.filter(
        (p) => p.name.toUpperCase() === text.toUpperCase()
      )[0];
      // go to that party with the found party
      navigate('/watchParty', {
        state: { party },
      });
      resetTranscript();
    }
  };

  return (
    <Form>
      <Form.Check
        type="switch"
        id="vc-switch"
        label={isSwitchOn ? 'Voice Control ON' : 'Voice Control OFF'}
        onChange={handleVoiceToggle}
        checked={isSwitchOn}
      />
      {isSwitchOn ? <p>{transcript}</p> : []}
    </Form>
  );
}
export default VoiceControl;
