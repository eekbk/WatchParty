import styled from 'styled-components';
import { Card, Image, Row, Col } from 'react-bootstrap';

export const StyledCardRow = styled(Row)`
  padding-left: 0;
  /* margin: 0 auto; */
`;

export const StyledCardCol = styled(Col)`
  padding-left: 0;
`;

export const StyledCardBody = styled(Card.Body)`
  padding: 8px;
  margin: 0;
  align-content: space-between;
  /* text-align: right; */
`;

export const StyledPartyCard = styled(Card)`
  height: 22rem;
  width: 18rem;
  padding: 0 auto;
  cursor: pointer;
  box-sizing: content-box;
  background-color: black;
  /* outline: #320e3b; */
  border-color: #6a1d7d;
  border-width: 1px;
`;
export const StyledDashPartyCard = styled(Card)`
  /* height: 23rem;
  width: 18rem;
  padding: 0 auto;
  cursor: pointer; */
  height: 22rem;
  width: 18rem;
  padding: 0 auto;
  cursor: pointer;
  box-sizing: content-box;
  background-color: black;
  /* outline: #320e3b; */
  border-color: #6a1d7d;
  border-width: 1px;
`;

export const StyledUserCard = styled(Card)`
  width: 17rem;
  height: 10rem;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-right: 4px;
  background-color: black;
  border-color: #6a1d7d;
  border-width: 1px;
`;

export const StyledVideoCard = styled(Card)`
  width: 90%;
  height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  margin: 4px;
  background-color: black;
  border-color: #6a1d7d;
  border-width: 1px;
`;

export const StyledUserCardImg = styled(Image)`
  width: 100px;
  height: 100px;
  margin: 8px;
  margin-right: 4px;
  overflow: hidden;
`;

export const StyledVideoCardImg = styled(Card.Img)`
  /* height: 50%; */
  width: 122px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  /* border-radius: 20px; */
  overflow: hidden;
`;

export const StyledVideoPartyCount = styled(Row)`
  align-items: center;
  justify-content: center;
  /* height: 10rem; */
  /* padding-top: 6px; */
`;

export const StyledCardFooter = styled(Card.Footer)`
  height: 45px;
`;

export const StyledUserCardFooter = styled(Row)`
  width: 100%;
  align-items: baseline;
  justify-content: end;
  /* margin-right: 15px; */
`;

export const StyledUserCardFooterCol = styled(Col)`
  /* align-items: end; */
  align-content: end;
  justify-content: end;
  margin-right: 4px;
  margin-left: 8px;
`;

export const StyledPartyTitle = styled(Card.Title)`
  font-size: larger;
  padding: 0;
  margin: 4px;
`;

export const StyledPartyDesc = styled(Card.Text)`
  font-size: 0.85em;
  margin: 8px 6px;
`;

export const StyledIsFollowing = styled(Card.Text)`
  font-size: smaller;
  color: gray;
  margin: 0px 6px;
`;

export const StyledPartyCardFooter = styled(Row)`
  width: 100%;
  align-items: baseline;
  justify-content: end;
  padding-right: 10px;
  padding-bottom: 10px;
  /* margin-right: 15px; */
`;

export const StyledPartyCardFooterCol = styled(Col)`
  /* align-items: end; */
  align-content: end;
  justify-content: end;
  margin-right: 15px;
`;

export const StyledVideoTitle = styled(Card.Title)`
  font-size: medium;
`;
