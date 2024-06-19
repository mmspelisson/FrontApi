import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FormWrapper = styled.div`
  width: 70%;
  max-width: 1278px;
  height: auto;
  background-color: #E2E2E2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  border: 1px solid #D3D3D3;
  margin: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

export const LabelContainer = styled.div`
  flex: 0 0 calc(33.33% - 10px);
  max-width: calc(33.33% - 10px);
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const LabelText = styled.label`
  font-size: 0.9em;
  margin-bottom: 5px;
  color: #5A5A5A;
`;

export const StyledInput = styled.input`
  height: 56px;
  padding: 10px;
  background-color: #E2E2E2; 
  border: 1px solid #AEAEAE;
  border-radius: 5px;
  color: #5A5A5A;
  font-size: 16px;

  &::placeholder {
    color: #999;
  }
`;

export const StyledSelect = styled.select`
  height: 56px;
  padding: 10px;
  background-color: #E2E2E2; 
  border: 1px solid #AEAEAE;
  border-radius: 5px;
  color: #5A5A5A;
  font-size: 16px;

  &::placeholder {
    color: #999;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  background-color: #151F6D;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

export const ClearButton = styled.button`
  background-color: #E2E2E2;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
`;

export const SubHeaderWrapper = styled.div`
  margin-bottom: 23.5px;
  width: 70%;
  height: 39px;
  margin: auto;
  background-color: #151F6D;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: 'Roboto Flex Regular', sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 25px;
`;

export const HeaderSpacer = styled.div`
  margin-bottom: 23.5px;
`;

export const ErrorMessageStyled = styled.span`
  font-size: 0.8em;
  color: red;
`;
