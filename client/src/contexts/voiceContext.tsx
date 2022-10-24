import { createContext, useState, useMemo } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export const VoiceContext = createContext(null);
export function VoiceContextProvider({ children }) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [searchBarVal, setSearchBarVal] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [followName, setFollowName] = useState('');
  const [blockName, setBlockName] = useState('');
  const [dmName, setDmName] = useState('');
  const [partyName, setPartyName] = useState('');

  // const navigate = useNavigate();

  const commands = [
    {
      command: ['Go to *', 'Take me (to) *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: [
        'Turn off mic',
        'Stop listening',
        'privacy please',
        'turn voice control off',
        'turn off voice control',
      ],
      callback: () => handleVoiceToggle(),
    },
    {
      command: ['clear', 'reset'],
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: ['search for *', 'look for *', 'show me *', 'look up *'],
      callback: (verbalSearch) => setSearchBarVal(verbalSearch),
    },
    {
      command: ['enter', 'send', 'make it so'],
      callback: () => setIsSent(!isSent),
    },
    {
      command: ['compose message *', 'write *', 'right *'],
      callback: (message) => setMessageText(message),
    },
    {
      command: ['follow *', 'unfollow *', 'stop following *'],
      callback: (name) => setFollowName(name),
    },
    {
      command: ['block *', 'unblock *', 'I never want to see :name again'],
      callback: (name) => setBlockName(name),
    },
    {
      command: ['DM *', 'message *'],
      callback: (name) => setDmName(name),
    },
    {
      command: ['open *', 'start the party called *'],
      callback: (party) => setPartyName(party),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

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

  const voiceVal = useMemo(
    () => ({
      transcript,
      commands,
      listening,
      browserSupportsSpeechRecognition,
      SpeechRecognition,
      redirectUrl,
      searchBarVal,
      setSearchBarVal,
      resetTranscript,
      isSwitchOn,
      setIsSwitchOn,
      isSent,
      messageText,
      setMessageText,
      handleVoiceToggle,
      followName,
      setFollowName,
      blockName,
      dmName,
      setDmName,
      partyName,
    }),
    [
      SpeechRecognition,
      transcript,
      listening,
      redirectUrl,
      isSwitchOn,
      isSent,
      messageText,
    ]
  );

  return (
    <VoiceContext.Provider value={voiceVal}>{children}</VoiceContext.Provider>
  );
}
