import styled from 'styled-components';

export const StyledSidebar = styled.nav`
  z-index: 2;
  grid-area: sidebar;
  width: 17.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.foreground};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  @media (max-width: 992px) {
    display: none;
  }
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 1.1rem 1rem 1rem 1rem;
  text-decoration: none;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: ease-in-out 150ms color;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  & > svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 1rem;
    transition: ease-in-out 150ms fill;
    margin-top: -0.1rem;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
  &.active {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.selection};
    & > svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
