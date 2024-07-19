import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartMESHeaderProps,
  PluginChartMESHeaderStylesProps,
} from './types';

const Styles = styled.div<PluginChartMESHeaderStylesProps>`
  background-color: ${({ theme }) => theme.tvDb.bg};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
    background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
    color: ${({ theme }) => theme.tvDb.fontColor.white};
    display: flex;
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

export default function PluginChartMESHeader(props: PluginChartMESHeaderProps) {
  const { data, height, width, boldText, headerFontSize } = props;

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  }, []);

  // Extract values from the data
  const values = data.length > 0 ? Object.values(data[0]) : [];

  return (
    <Styles
      ref={rootElem}
      boldText={boldText}
      headerFontSize={headerFontSize}
      height={height}
      width={width}
    >
      <div
        className="flex"
        style={{
          // display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <h3>
          {values.map((value, index) => (
            <header key={index} style={{ marginRight: '15px' }}>
              {value}
            </header>
          ))}
        </h3>
      </div>
    </Styles>
  );
}
