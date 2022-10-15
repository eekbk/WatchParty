import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { SearchContext } from '../../contexts/searchContext';

function VoiceControl() {
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const { setVideosMatch, setUsersMatch, setPartiesMatch } =		useContext(SearchContext);

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
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  };

  const commands = [
    {
      command: ['Go to *', 'Open *', 'Go back *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: [
        'Turn off mic',
        'Stop listening',
        'privacy please',
        'turn voice control off',
      ],
      callback: () => handleSwitch(),
    },
    {
      command: ['clear', 'reset'],
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: ['search for *', 'look for *', 'show me *'],
      callback: (verbalSearch) => setSearchVal(verbalSearch),
    },
    {
      command: ['enter', 'send', 'make it so'],
      callback: () => searchRequest(searchVal),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
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

  // const redirect: any = '';
  // !!!!!!!!!!!!!!!! try this is useeffect
  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      navigate(urls[redirectUrl]);
    } else {
      alert('Page not recognized');
    }
  }

  const handleSwitch = async () => {
    if (!listening) {
      await SpeechRecognition.startListening({ continuous: true });
      setIsSwitchOn(true);
    } else {
      await SpeechRecognition.abortListening();
      setIsSwitchOn(false);
      resetTranscript();
    }
  };

  // console.log({transcript});
  // useEffect(() => {
  //   // check if the VC is on
  //   if (isVCOn) {
  //     SpeechRecognition.startListening({ continuous: true });
  //   } else {
  //     SpeechRecognition.abortListening();
  //   }
  // }, [isVCOn]);
  return (
    <Form>
      <Form.Check
        type="switch"
        id="vc-switch"
        label={isSwitchOn ? 'Voice Control ON' : 'Voice Control OFF'}
				// title={forceRerender}
        onChange={handleSwitch}
        checked={isSwitchOn}
      />
      {isSwitchOn ? <p>{transcript}</p> : []}
      {/* <Form.Control
        type="text"
      /> */}
    </Form>
  );
}
export default VoiceControl;
