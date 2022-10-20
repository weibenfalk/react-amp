import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  --duration: 10s;
  --gap: 0px;

  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);

  position: relative;
  color: #00e800;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  width: 152px;
  height: 10px;
  margin: 0;
  padding: 0;

  p {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    gap: 10px;
    animation: scroll var(--duration) steps(50, end) infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(calc(-100% - var(--gap)));
      }
    }
  }
`;
