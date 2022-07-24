import { FC } from 'react';

import { Flexbox } from '@/components/Box';
import { ControlIcon, FolderIcon, HotendIcon, NodeIcon, PluginIcon, SettingsIcon } from '@/components/Icon';
import Logo from '@/components/Logo';
import Typography from '@/components/Typography';

import NavLink from './NavLink';
import { Link, Links, StyledSidebar } from './styles';

const Sidebar: FC = () => (
  <StyledSidebar>
    <Flexbox padding="2rem 0" marginBottom="1rem" direction="column" gap="0.25rem">
      <Logo />
      <Typography variant="p" align="center">
        Printer management system
      </Typography>
    </Flexbox>
    <Links>
      <NavLink href="/">
        <Link>
          <HotendIcon />
          Printers
        </Link>
      </NavLink>
      <NavLink href="/control">
        <Link>
          <ControlIcon />
          Control
        </Link>
      </NavLink>
      <NavLink href="/nodes">
        <Link>
          <NodeIcon />
          Nodes
        </Link>
      </NavLink>
      <NavLink href="/files">
        <Link>
          <FolderIcon />
          Files
        </Link>
      </NavLink>
      <NavLink href="/plugins">
        <Link>
          <PluginIcon />
          Plugins
        </Link>
      </NavLink>
      <NavLink href="/settings">
        <Link>
          <SettingsIcon />
          Settings
        </Link>
      </NavLink>
    </Links>
  </StyledSidebar>
);

export default Sidebar;
