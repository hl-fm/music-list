import * as React from 'react';
import styled from 'styled-components/macro';

const ProgressBar = styled.div`
  height: 20px;
  margin: 5px 5px 10px 5px;
  padding-top: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;

  ::before {
    content: '';
    width: 100%;
    margin: auto;
    background-color: rgba(124, 124, 124, 0.5);
    height: ${props => `${props['data-hidden'] === false ? 5 : 1}px`};
    display: block;
  }
  ::after {
    content: '';
    float: left;
    width: ${props => `${props['aria-valuenow']}%`};
    height: 5px;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    transition: width 0.3s ease;
    position: absolute;
    left: 0;
    top: 5px;
    opacity: ${props => `${props['data-hidden'] === false ? 1 : 0}`};
  }
  span {
    position: absolute;
    left: ${props => `calc(${props['aria-valuenow']}% - 2px)`};
    top: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #337ab7;
    box-shadow: 0px 0px 5px 2px rgb(204 205 210 / 37%);
    transition: left 0.3s ease;
    opacity: ${props => `${props['data-hidden'] === false ? 1 : 0}`};
  }
`;

export const Progress: React.FunctionComponent<{
  value: number;
  active?: boolean;
}> = ({ value, active }) => {
  return (
    <ProgressBar
      aria-valuenow={value < 0 ? 0 : value > 100 ? 100 : value}
      data-hidden={!active}
    >
      <span></span>
    </ProgressBar>
  );
};
