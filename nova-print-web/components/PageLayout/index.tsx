import { FC, PropsWithChildren } from 'react';

import SideBar from '@/components/SideBar';

import { Container, PageContent, PageLayoutRight } from './styles';

const PageLayout: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <Container>
    <SideBar />
    <PageLayoutRight>
      <PageContent>{children}</PageContent>
    </PageLayoutRight>
  </Container>
);

export default PageLayout;
