import React from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { FlexColumn, FlexRow } from "../../components/Flex";
import BaseInput from "../../components/Input/BaseInput/BaseInput";
import Label from "../../components/Label/Label";
import { constants } from "../../components/styling/constants";
import { useAuth } from "../../contexts/AuthProvider";

const LoginForm = styled.div`
  padding: 10px;
  background: ${constants.colors.WHITE};
  border: solid 1px ${constants.colors.BLACK};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const LoginFormErrorMessage = styled.div`
  padding: 10px 0;
  font-size: 14px;
  /* TODO Change this to be pulled from constants */
  color: red;
`;

export default function LoginScreen() {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState();

  const {login} = useAuth();

  const submit = async () => {
    const res = await login(loginData.username, loginData.password);
  }

  return (
    <FlexColumn
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <LoginForm>
        <h3>Login Forma</h3>
        <Label label="Korisnicko Ime">
          <BaseInput
            value={loginData.username}
            setValue={(value) =>
              setLoginData({ ...loginData, username: value })
            }
            type="text"
            placeholder="Unesite korisnicko ime"
          />
        </Label>

        <Label label="Lozinka">
          <BaseInput
            value={loginData.password}
            setValue={(value) =>
              setLoginData({ ...loginData, password: value })
            }
            type="password"
            placeholder="Unesite lozinku"
          />
        </Label>
        {!!errorMessage && (
          <LoginFormErrorMessage>{errorMessage}</LoginFormErrorMessage>
        )}

        <div style={{ textAlign: "right", margin: '10px 0 50px' }}>
          <a href="#">Zaboravili ste lozinku?</a>
        </div>

        <Button action={submit}>Prijavi se</Button>
      </LoginForm>
    </FlexColumn>
  );
}
