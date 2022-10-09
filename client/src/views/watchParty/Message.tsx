import { Container } from 'react-bootstrap';

function Message({ message, user }) {
  return (
    <Container
      style={{ wordWrap: 'break-word', maxWidth: '20vw', paddingTop: '5px' }}
    >
      {user ? user.user_name : 'null'}
      :
      {message.message || message}
    </Container>
  );
}

// WIP rounded edges + background version
// function Message({ message, user }) {
//   return (
//     <Container style={{borderRadius: '50% 70% 5% 50%', background: 'black', padding: '10px',
//                        color: 'white', maxWidth: '10vw', minHeight: '2.5vw'}}>
//       {user ? user.user_name : 'null'}
//       :
//       {message.message || message}
//     </Container>
//   );
// }

// WIP tooltips version
// Probably way easier to just round the container edges i
// nto a chat box shape and give them a background
// function Message({ message, user }) {
//   const [show, setShow] = useState(false);
//   useEffect(()=> {
//     setShow(true);
//   }, [])
// 	return (
// 		<OverlayTrigger
// 			show={show}
// 			key={'right-start'}
// 			placement={'right-start'}
// 			overlay={
// 				<Tooltip id={`tooltip-right-start`}>
// 					{user ? user.user_name : 'null'}:{message.message || message}
// 				</Tooltip>
// 			}
// 		>
// 			<Button></Button>
// 		</OverlayTrigger>
// 	);
// }

export default Message;
