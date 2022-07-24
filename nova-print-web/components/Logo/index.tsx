import { FC } from 'react';

import Color from '@/components/Color';
import Typography from '@/components/Typography';

export type LogoSize = 'small' | 'medium' | 'large';

export interface LogoProps {
  size?: LogoSize;
}

const Logo: FC<LogoProps> = ({ size = 'medium' }) => {
  const getTypographyVariant = () => {
    switch (size) {
      case 'small':
        return 'h4';
      case 'medium':
        return 'h3';
      case 'large':
        return 'h2';
    }
  };

  return (
    <Typography variant={getTypographyVariant()} align="center">
      <Color color="primary">Nova</Color>Print
    </Typography>
  );
};

export default Logo;
