import {
  StyledForm,
  StyledFormGroup,
  StyledFormControl,
  StyledFormLabel,
  StyledFormTextarea,
} from './styles';

export function RoomDetails({ setName, setDescription, setDate, date, name }) {
  return (
    <StyledForm style={{ marginTop: '10px', maxWidth: '27rem' }}>
      <StyledFormGroup>
        <StyledFormLabel>
          {name.length ? 'Room Name' : 'Room Name*'}
        </StyledFormLabel>
        <StyledFormControl
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Room Name Here"
        />
        <br />
      </StyledFormGroup>
      <StyledFormGroup>
        <StyledFormLabel>Description</StyledFormLabel>
        <br />
        <StyledFormTextarea
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          placeholder="Describe Room Here"
        />
      </StyledFormGroup>
      <br />
      <StyledFormGroup>
        <StyledFormLabel>Date</StyledFormLabel>
        <br />
        <StyledFormControl
          as="input"
          value={`${date.getFullYear()}-${
            String(date.getMonth() + 1).length >= 2
              ? date.getMonth() + 1
              : `0${  date.getMonth() + 1}`
          }-${
            String(date.getDate()).length >= 2
              ? date.getDate()
              : `0${  date.getDate()}`
          }`}
          min={`${new Date().getFullYear()}-${
            String(new Date().getMonth() + 1).length >= 2
              ? new Date().getMonth() + 1
              : `0${  new Date().getMonth() + 1}`
          }-${
            String(new Date().getDate()).length >= 2
              ? new Date().getDate()
              : `0${  new Date().getDate()}`
          }`}
          max={`${new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ).getFullYear()}-${
            String(
              new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getMonth() + 1
            ).length >= 2
              ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getMonth() + 1
              : `0${ 
                new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getMonth() +
                  1}`
          }-${
            String(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getDate())
              .length >= 2
              ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getDate()
              : `0${  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getDate()}`
          }`}
          type="date"
          onChange={(e) => {
            console.log(
              `${date.getFullYear()}-${
                String(date.getMonth() + 1).length >= 2
                  ? date.getMonth() + 1
                  : `0${  date.getMonth() + 1}`
              }-${
                String(date.getDate()).length >= 2
                  ? date.getDate()
                  : `0${  date.getDate()}`
              }`
            );
            const tempTime = date.toString().slice(16, 21);
            let tempDate = new Date(e.target.value);
            tempDate = new Date(
              tempDate.getUTCFullYear(),
              tempDate.getUTCMonth(),
              tempDate.getUTCDate()
            );
            tempDate.setHours(tempTime.slice(0, 2), tempTime.slice(3, 5));
            setDate(tempDate);
          }}
        />
        <br />
        <br />
        <StyledFormLabel>Time</StyledFormLabel>
        <br />
        <StyledFormControl
          as="input"
          value={date.toString().slice(16, 21)}
          min="00:00"
          max="23:59"
          type="time"
          onChange={(e) => {
            date.setHours(
              e.target.value.slice(0, 2),
              e.target.value.slice(3, 5)
            );
            setDate(new Date(date.getTime()));
          }}
        />
      </StyledFormGroup>
    </StyledForm>
  );
}
