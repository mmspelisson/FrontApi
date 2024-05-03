import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const FormWrapper = styled.div`
  width: 70%; 
  max-width: 1278px; 
  height: 150px;
  background-color: #E2E2E2;
  mix-blend-mode: pass-through;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #D3D3D3;
  margin: auto;
  flex-grow: 1;
`

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Label = styled.label`
  width: 45%;
  height: 56px;
  margin: 10px;
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 10px;
  margin-left: 10px;
  background-color: #E2E2E2;
  border: 1px solid #AEAEAE;
  border-radius: 5px;
  color: #5A5A5A; 
  &::placeholder {
    color: #5A5A5A;
  }
`

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export const SubmitButton = styled.button`
  background-color: #151F6D;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`

export const ClearButton = styled.button`
  background-color: #E2E2E2;
  color: #000;
  border: none;
  padding: 15px 20px;
  border-radius: 3px;
  cursor: pointer;
`

export const SubHeaderWrapper = styled.div`
  margin-bottom: 23.5px;
  width: 70%;
  height: 39px;
  margin: auto;
  margin-bottom: 23.5px;
  background-color: #151F6D;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: 'Roboto Flex Regular', sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 25px;
  border-radius: 0;
`

export const HeaderSpacer = styled.div`
  margin-bottom: 23.5px;
`
