import styled from 'styled-components';

import { TypographyProps } from './';

type Props = Omit<TypographyProps, 'variant'>;

const BaseTypography = styled.div<Props>`
  margin: ${(props) => props.m ?? 0};
  padding: ${(props) => props.p ?? 0};
  ${(props) => props.align && `text-align: ${props.align};`};
`;

export const P = styled(BaseTypography).attrs({
  as: 'p',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre-line;
  overflow-wrap: anywhere;
`;

export const H1 = styled(BaseTypography).attrs({
  as: 'h1',
})<Props>`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
`;

export const H2 = styled(BaseTypography).attrs({
  as: 'h2',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
`;

export const H3 = styled(BaseTypography).attrs({
  as: 'h3',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
`;

export const H4 = styled(BaseTypography).attrs({
  as: 'h4',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const H5 = styled(BaseTypography).attrs({
  as: 'h5',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const H6 = styled(BaseTypography).attrs({
  as: 'h6',
})<Props>`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;
