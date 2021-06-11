import * as React from 'react';
import styled from 'styled-components/macro';

interface MusicButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  play?: boolean;
  disabled?: boolean;
  size?: 'medium' | 'large';
}

const PlayButton: React.FunctionComponent<MusicButtonProps> = ({
  play,
  onClick,
  disabled,
  size = 'medium',
}) => {
  return (
    <CircleButton
      title={play ? 'Pause' : 'Play'}
      onClick={onClick}
      disabled={disabled}
      data-size={size}
    >
      {play ? <span>⬜</span> : <span>▶</span>}
    </CircleButton>
  );
};

const CircleButton = styled.button`
  width: ${props => `${props['data-size'] === 'large' ? 50 : 35}px`};
  height: ${props => `${props['data-size'] === 'large' ? 50 : 35}px`};
  border-radius: 50%;
  border: 1px solid #bfbfbf;
  background: ${props =>
    `${
      props['data-active'] === true ? `rgb(255 255 255 / 36%)` : `transparent`
    }`};
  color: #bfbfbf;

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;

export { CircleButton, PlayButton };
