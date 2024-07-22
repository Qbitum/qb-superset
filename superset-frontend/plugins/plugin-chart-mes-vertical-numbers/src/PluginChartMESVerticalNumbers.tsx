import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartMESVerticalNumbersProps,
  PluginChartMESVerticalNumbersStylesProps,
} from './types';

const Styles = styled.div<PluginChartMESVerticalNumbersStylesProps>`
  background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
  padding: 0 ${({ theme }) => theme.tvDb.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  ${({ theme }) => `
    .number-line {
      font-family: ${theme.tvDb.font.roboto};
      font-size: 4vw;
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight: ${theme.tvDb.fontWeights.bold};
      color: ${theme.tvDb.fontColor.white};
      text-align: right;
      margin-left: auto;
      
    }

    .contentTitle-line {
      font-family: ${theme.tvDb.font.roboto};
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight:${theme.tvDb.fontWeights.normal};
      font-size: 3em;
      color: ${theme.tvDb.fontColor.gray80};
      text-align: left;
    }

    .subheader-line {
       line-height: 1em;
       padding-bottom: 8pt;
       color: ${theme.tvDb.fontColor.white};
       font-size: 2em;
       text-align: left;
     }
  `}
`;

export default function PluginChartMESHeader(
  props: PluginChartMESVerticalNumbersProps,
) {
  const { data, height, width, boldText } = props;

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  }, []);

  // Extract values from the data
  const values = data.length > 0 ? Object.values(data[0]) : [];
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Styles ref={rootElem} boldText={boldText} height={height} width={width}>
      <div
        className="flex"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {headers.map((header, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div className="contentTitle-line" style={{ flex: '1' }}>
              {header}
            </div>
            <span className="number-line" style={{ flex: '1' }}>
              {values[index]}
            </span>
          </div>
        ))}
      </div>
    </Styles>
  );
}
