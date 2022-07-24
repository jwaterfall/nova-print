import { FC, PropsWithChildren } from 'react';

import { H1, H2, H3, H4, H5, H6, P } from './styles';

export type TypographyVariant = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps {
  variant?: TypographyVariant;
  align?: TypographyAlign;
  m?: string;
  p?: string;
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({ variant = 'p', align = 'left', ...props }) => {
  switch (variant) {
    case 'p':
      return <P align={align} {...props} />;
    case 'h1':
      return <H1 align={align} {...props} />;
    case 'h2':
      return <H2 align={align} {...props} />;
    case 'h3':
      return <H3 align={align} {...props} />;
    case 'h4':
      return <H4 align={align} {...props} />;
    case 'h5':
      return <H5 align={align} {...props} />;
    case 'h6':
      return <H6 align={align} {...props} />;
  }
};

export default Typography;
