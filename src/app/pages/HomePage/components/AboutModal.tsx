import * as React from 'react';
import styled from 'styled-components';
import { CircleButton } from './PlayButton';

const ModalSection = styled.section`
  opacity: ${props => (props.hidden ? 0 : 1)};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9001;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  transition: opacity 0.1s linear;
`;

const ModalContainer = styled.div`
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 40rem;
  min-width: 20rem;
  padding: 3rem 0;
  position: relative;
  transform: translate(0);
  transition: transform 0.1s linear, opacity 0.1s linear,
    -webkit-transform 0.1s linear;
  width: 50%;
`;

const ModalHeader = styled.header`
  position: relative;
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  /* border-bottom: 2px solid #dddbda; */
  background-color: #fff;
  color: rgb(8, 7, 7);
  /* padding: 1rem; */
  text-align: center;
`;

const ModalContent = styled.div`
  padding: 1rem;
  background-color: #fff;
  color: rgb(8, 7, 7);
  overflow: hidden;
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  opacity: ${props => (props.hidden ? 0 : 1)};
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(8, 7, 7, 0.6);
  z-index: 9000;
  transition: opacity 0.4s linear;
`;

const CloseModalButton = styled(CircleButton)`
  color: #fff;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: -2.5rem;
  right: -0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid transparent;
`;

export const AboutModal: React.FunctionComponent<{
  shown: boolean;
  close: Function;
}> = ({ shown, close }) => {
  return (
    <React.Fragment>
      <ModalSection
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        hidden={!shown}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseModalButton title="Close" onClick={() => close()}>
              <span>✕</span>
            </CloseModalButton>
            {/* <h2>header</h2> */}
          </ModalHeader>
          <ModalContent>
            <p>My collection of Hololive's music</p>
            <p>For research purpose</p>
            <p>
              Background{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://storyset.com/nature"
              >
                Nature illustrations by Storyset
              </a>
            </p>
          </ModalContent>
        </ModalContainer>
      </ModalSection>
      <ModalBackdrop hidden={!shown} />
    </React.Fragment>
  );
};
