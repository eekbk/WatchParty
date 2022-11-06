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
  const [attendPartyName, setAttendPartyName] = useState('');
  const [closeModalToggle, setCloseModalToggle] = useState(false);
  const [openModalToggle, setOpenModalToggle] = useState(false);
  const [voiceKey, setVoiceKey] = useState('parties');
  const [voicePageNum, setVoicePageNum] = useState(1);

  // const navigate = useNavigate();

  const commands = [
    {
      command: ['Go to *', 'Take me (to) *'],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: [
        'turn off mic',
        'stop listening',
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
      command: ['search for *', 'look for *', 'look up *'],
      callback: (verbalSearch) => setSearchBarVal(verbalSearch),
    },
    {
      command: ['enter', 'send', 'please', 'thank you', 'thanks', 'make it so'],
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
      command: [
        'block *',
        'unblock *',
        // 'I never want to see :name (on this site) again',
      ],
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
    {
      command: [
        'join *',
        'unjoin *',
        'remove me from *',
        "don't go to *",
        'leave *',
      ],
      callback: (party) => setAttendPartyName(party),
    },
    {
      command: ['exit', 'close'],
      callback: () => setCloseModalToggle(!closeModalToggle),
    },
    {
      command: ['help', 'info'],
      callback: () => setOpenModalToggle(!openModalToggle),
    },
    {
      command: ['switch to *', 'show me *'],
      callback: (key) => setVoiceKey(key),
    },
    {
      command: 'page *',
      callback: (pageNum) => setVoicePageNum(pageNum),
    },
    {
      command: 'next page',
      callback: () => setVoicePageNum(voicePageNum + 1),
    },
    {
      command: 'previous page',
      callback: () => setVoicePageNum(voicePageNum - 1),
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
      closeModalToggle,
      openModalToggle,
      voiceKey,
      setVoiceKey,
      voicePageNum,
      setVoicePageNum,
      attendPartyName,
      setAttendPartyName,
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
