import styled from 'styled-components';

export type ColorVariant = 'primary' | 'secondary';

export interface ColorProps {
  color: ColorVariant;
}

export const Color = styled.span<ColorProps>`
  color: ${({ color, theme }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      default:
        return theme.colors.text;
    }
  }};
`;

export default Color;
