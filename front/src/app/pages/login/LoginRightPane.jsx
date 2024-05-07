import React from 'react'
import styled from 'styled-components'


const RightPane = () => {
    return <RightPaneContainer />
}

const RightPaneContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #DACF61;
  flex: 1;
`

export default RightPane



// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

// const RightPane = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleTogglePasswordVisibility = () => {
//         setShowPassword(prevState => !prevState);
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleLogin = () => {
//         // Implement login functionality here
//     };

//     return (
//         <RightPaneContainer>
//             <LoginTitle>Login</LoginTitle>
//             <FormContainer>
//                 <InputContainer>
//                     <IconWrapper>
//                         <FaUser />
//                     </IconWrapper>
//                     <InputField
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={handleUsernameChange}
//                     />
//                 </InputContainer>
//                 <InputContainer>
//                     <IconWrapper>
//                         <FaLock />
//                     </IconWrapper>
//                     <InputField
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                     />
//                     <IconWrapper onClick={handleTogglePasswordVisibility}>
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </IconWrapper>
//                 </InputContainer>
//                 <LoginButton onClick={handleLogin}>Login</LoginButton>
//             </FormContainer>
//         </RightPaneContainer>
//     );
// };

// const RightPaneContainer = styled.div`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const LoginTitle = styled.h2`
//     margin-bottom: 20px;
// `;

// const FormContainer = styled.div`
//     width: 50%;
//     max-width: 400px;
// `;

// const InputContainer = styled.div`
//     display: flex;
//     align-items: center;
//     margin-bottom: 20px;
// `;

// const IconWrapper = styled.div`
//     margin-right: 10px;
// `;

// const InputField = styled.input`
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     outline: none;
//     flex: 1;
// `;

// const LoginButton = styled.button`
//     padding: 10px 20px;
//     background-color: #4CAF50;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     outline: none;
//     &:hover {
//         background-color: #45a049;
//     }
// `;

// export default RightPane;
