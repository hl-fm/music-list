import * as React from 'react';
import styled from 'styled-components/macro';
import { VscUnmute, VscMute } from 'react-icons/vsc';
import { CircleButton } from './PlayButton';

const VolumeInputWrapper = styled.div`
  position: absolute;
  top: -120px;
  left: -70px;
  width: 180px;
  visibility: ${props => (props.hidden ? 'collapse' : 'visible')};
  transform: rotateZ(-90deg);
  background-color: #757575;
  padding: 5px 15px;
  border-radius: 15px;
  z-index: 1;
`;

export const VolumeButton: React.FunctionComponent<{
  value: number;
  setVolume: Function;
}> = ({ value, setVolume }) => {
  const [showVolume, setShowVolume] = React.useState(false);

  return (
    <CircleButton
      style={{
        position: 'relative',
      }}
      title="Volume"
      onClick={() => setShowVolume(value => !value)}
      data-active={showVolume}
    >
      {value === 0 ? <VscMute /> : <VscUnmute />}
      <VolumeInputWrapper hidden={!showVolume}>
        <input
          style={{
            width: '100%',
          }}
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={e => {
            setVolume(parseFloat(e.target.value));
          }}
        />
      </VolumeInputWrapper>
    </CircleButton>
  );
};
