import * as React from 'react';
import styled from 'styled-components/macro';
import { CircleButton } from './PlayButton';

const VolumeInputWrapper = styled.div`
  position: absolute;
  top: -80px;
  left: -50px;
  visibility: ${props => (props.hidden ? 'collapse' : 'visible')};
  transform: rotateZ(90deg);
`;

export const VolumeButton: React.FunctionComponent<{
  value: number;
  setVolume: Function;
}> = ({ value, setVolume }) => {
  const [showVolume, setShowVolume] = React.useState(false);

  return (
    <CircleButton
      title="Volume"
      onClick={() => setShowVolume(value => !value)}
      data-active={showVolume}
    >
      <span>🔊</span>
      <VolumeInputWrapper hidden={!showVolume}>
        <input
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
