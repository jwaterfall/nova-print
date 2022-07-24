import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export type ButtonColor = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  isFullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  ${({ theme, color }) => color === 'primary' && `color: ${theme.colors.primary};`}
  ${({ theme, color }) => color === 'secondary' && `color: ${theme.colors.secondary};`}
  background: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.95rem 1rem 0.75rem 1rem;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  text-decoration: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  ${({ isFullWidth }) => isFullWidth && 'width: 100%;'};
  & > svg {
    height: 1.5rem;
    width: 1.5rem;
    transition: ease-in-out 150ms fill;
    margin-top: -0.2rem;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export default Button;
