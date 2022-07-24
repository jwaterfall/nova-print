import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'sidebar content';
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas: 'topbar' 'content';
  }
`;

export const PageLayoutRight = styled.div`
  grid-area: content;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  align-items: stretch;
`;

export const Column = styled.div<{
  s?: number;
  m?: number;
  l?: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 1rem;
  grid-column-end: span 12;
  ${(props) => props.l && `grid-column-end: span ${props.l};`}
  ${(props) => props.m && `@media (max-width: 1400px) {grid-column-end: span ${props.m}};`}
  ${(props) => props.s && `@media (max-width: 992px) {grid-column-end: span  ${props.s}};`}
`;
