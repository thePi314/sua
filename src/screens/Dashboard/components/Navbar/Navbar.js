import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { constants } from "../../../../components/styling/constants";

const NavbarWrapper = styled.div`
  width: 256px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;

  background: ${constants.colors.BLUE};

  padding-top: 48px;
`;

const NavbarItem = styled.div`
  padding: 4px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  font-size: 20px;
  

  color: ${constants.colors.WHITE};
  background: ${({ active }) =>
    !active ? constants.colors.BLUE : constants.colors.DARK_BLUE};
`;

export default function Navbar({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavbarWrapper>
      {items.map((item) => (
        <NavbarItem
          onClick={() => navigate(item.path)}
          active={location.pathname === item.path}
        >
          {item.label}
        </NavbarItem>
      ))}
    </NavbarWrapper>
  );
}
