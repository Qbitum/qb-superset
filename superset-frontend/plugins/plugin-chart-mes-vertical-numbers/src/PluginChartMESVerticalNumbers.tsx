import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartMESVerticalNumbersProps,
  PluginChartMESVerticalNumbersStylesProps,
} from './types';

const Styles = styled.div<PluginChartMESVerticalNumbersStylesProps>`
  background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  ${({ theme }) => `
    .number-line {
      font-family: ${theme.tvDb.font.roboto};
      font-size: 3em;
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
  const { data, height, width, boldText, subHeader } = props;

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  }, []);

  // Extract values from the data
  const values = data.length > 0 ? Object.values(data[0]) : [];
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const renderSubheader = () => {
    if (subHeader) {
      return <div className="subheader-line">{subHeader}</div>;
    }
    return null;
  };

  return (
    <Styles
      ref={rootElem}
      boldText={boldText}
      height={height}
      width={width}
      headerFontSize="s"
      subHeader=""
    >
      <div
        className="flex"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderSubheader()}

        {headers.map((header, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginBottom: '15px',
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

// export default styled(MESVerticalNumbers)`
//   ${({ theme }) => `
//     font-family: ${theme.tvDb.font.roboto};
//     font-style: ${theme.tvDb.fontStyles.normal};
//     font-weight: ${theme.tvDb.fontWeights.normal};
//     padding: 16px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     background-color: ${theme.tvDb.bg.tvDbBg};

//     .subheader-line {
//       line-height: 1em;
//       padding-bottom: 0;
//       color: ${theme.tvDb.fontColor.white};
//       font-size: 2em;
//     }
//     .component-body {
//       padding:${theme.tvDb.component.padding};
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//       height: 100%;
//       justify-content: center;
//     }
//     .content-container {
//       display: flex;
//       width: 100%;
//       justify-content: space-between;
//       align-items: center;
//     }

//     .contentTitle-line {
//       text-align: center;
//       font-family: ${theme.tvDb.font.roboto};
//       font-style: ${theme.tvDb.fontStyles.normal};
//       font-weight:${theme.tvDb.fontWeights.normal};
//       line-height: normal;
//       color: ${theme.tvDb.fontColor.gray80};
//     }

//     .number-line {
//       font-family: ${theme.tvDb.font.roboto};
//       font-size: 200px;
//       font-style: ${theme.tvDb.fontStyles.normal};
//       font-weight: ${theme.tvDb.fontWeights.bold};
//       color: ${theme.tvDb.fontColor.gray80};
//       text-align: right;
//     }
//   `}
// `;
