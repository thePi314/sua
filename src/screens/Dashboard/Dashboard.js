import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import { FlexRow, FlexColumn } from "../../components/Flex";
import { constants } from "../../components/styling/constants";
import { useAuth } from "../../contexts/AuthProvider";

import Navbar from "./components/Navbar/Navbar";

const Header = styled.div`
  width: 100%;
  height: 48px;
  background: ${constants.colors.DARK_BLUE};
  
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <FlexRow width="100vw" height="100vh">
      <Navbar
        items={[
          ...(currentUser?.role === "Admin"
            ? [
                {
                  label: "Zaposlenici",
                  path: "/dashboard/users",
                },
              ]
            : []),
          {
            label: "Dobavljaci", 
            path: '/dashboard/dobavljaci'
          },
          {
            label: "Sirovine", 
            path: '/dashboard/sirovine'
          },
          {
            label: "Proizvodni procesi", 
            path: '/dashboard/proizvodniproces'
          },
          {
            label: "Proizvodi", 
            path: '/dashboard/proizvodi'
          }
        ]}
      />
      <FlexColumn flex="1">
        <Header>
          <span style={{fontWeight: '600', color: 'white'}}>{`Pozdrav ${currentUser.korisnicko_ime}`}</span>
          <Button action={()=>logout()}>Logout</Button>
        </Header>
        <Outlet />
      </FlexColumn>
    </FlexRow>
  );
}
