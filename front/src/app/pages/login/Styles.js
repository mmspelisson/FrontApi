import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import myGlobalStyles from '../../styles/globalStyles'

const GlobalStyle = createGlobalStyle`
  ${myGlobalStyles}
`

export const Container = styled.div`
  margin: 0;
  display: flex;
`
