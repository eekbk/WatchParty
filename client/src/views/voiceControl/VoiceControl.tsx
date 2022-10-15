import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function VoiceControl() {
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isVCOn, setIsVCOn] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // const switchToggle = () => {

  // }

  const commands = [
    {
      command: ['Go to *', 'Open *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: ['Turn off mic', 'Stop listening', 'privacy please'],
      callback: () => handleSwitch(),
    },
    {
      command: ['clear', 'reset'],
      callback: ({ resetTranscript }) => resetTranscript(),
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
        label="Voice Control On/Off"
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
