import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartMESHeaderProps,
  PluginChartMESHeaderStylesProps,
} from './types';
import Logo from './images/makeit-logo.png';
import OnlineStatus from './OnlineStatus';
import TimePicker from './TimePicker';

function getBoxStyle(index: number) {
  const styles = [
    'darkPurpleBadge',
    'lightPurpleBadge',
    'lightOrangeBadge',
    'darkGrayBadge',
    'darkGrayBadge',
    'lightGrayBadge',
    'greenBadge',
    'transparentBadge',
  ];
  return { classNames: styles[index % styles.length] };
}

const Styles = styled.div<PluginChartMESHeaderStylesProps>`
  background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: auto;
  width: auto;
  padding: 4pt;
  .db-title {
    margin: 0;
    color: ${({ theme }) => theme.tvDb.fontColor.white};
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
    background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
    color: ${({ theme }) => theme.tvDb.fontColor.white};
    display: flex;
    align-items: center;
    height: 100%;
  }
  .logo-wrapper {
    display: 'flex';
    marginleft: '14pt';
    alignitems: 'self-end';
    color: ${({ theme }) => theme.tvDb.fontColor.white};
    flexgrow: '3';
    border-left: 2px solid;
  }
`;

const LightPurpleBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightPurplebg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 4px;
  padding: 8px;
  white-space: nowrap;
`;

const DarkPurpleBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.darkPurplebg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 4px;
  padding: 8px;
  white-space: nowrap;
`;

const LightOrangeBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightOrangebg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 4px;
  padding: 8px;
  white-space: nowrap;
`;
const DarkGrayBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.darkGraybg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 4px;
  padding: 8px;
  white-space: nowrap;
`;
const LightGrayBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightGraybg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 4px;
  padding: 8px;
  white-space: nowrap;
`;
const GreenBadgeStyled = styled.div`
  border-radius: 4px;
`;

const TransparentBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.transparentbg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 4px;
  align-items: center;
`;
export default function PluginChartMESHeader(props: PluginChartMESHeaderProps) {
  const { data, height, width, boldText, headerFontSize } = props;

  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current;
    console.log('Plugin element', root);
  }, []);

  // Extract values from the data
  const values = data.length > 0 ? Object.entries(data[0]) : [];

  return (
    <Styles
      ref={rootElem}
      boldText={boldText}
      headerFontSize={headerFontSize}
      height={height}
      width={width}
    >
      {/* <h3> */}
      <h3
        className="flex"
        style={{
          alignContent: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <div
          style={{
            marginRight: '1rem',
            display: 'flex',
            alignItems: 'center',
            flexGrow: '1',
          }}
        >
          <h2 className="db-title">KPI</h2>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: '6',
          }}
        >
          {values.map(([key, value], index) => {
            const boxStyle = getBoxStyle(index);
            if (
              boxStyle.classNames !== 'greenBadge' &&
              boxStyle.classNames !== 'transparentBadge'
            ) {
              return (
                <header
                  key={index}
                  style={{
                    marginRight: '15px',
                    ...boxStyle,
                  }}
                >
                  {boxStyle.classNames === 'lightPurpleBadge' ? (
                    <LightPurpleBadgeStyled>{value}</LightPurpleBadgeStyled>
                  ) : boxStyle.classNames === 'darkPurpleBadge' ? (
                    <DarkPurpleBadgeStyled>{value}</DarkPurpleBadgeStyled>
                  ) : boxStyle.classNames === 'lightOrangeBadge' ? (
                    <LightOrangeBadgeStyled>{value}</LightOrangeBadgeStyled>
                  ) : boxStyle.classNames === 'darkGrayBadge' ? (
                    <DarkGrayBadgeStyled>{value}</DarkGrayBadgeStyled>
                  ) : boxStyle.classNames === 'lightGrayBadge' ? (
                    <LightGrayBadgeStyled>{value}</LightGrayBadgeStyled>
                  ) : (
                    value
                  )}
                </header>
              );
            }
            return null;
          })}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GreenBadgeStyled>{OnlineStatus()}</GreenBadgeStyled>
          <TransparentBadgeStyled>{TimePicker()}</TransparentBadgeStyled>

          <div className="logo-wrapper">
            <img
              src={Logo}
              alt="Makeit Logo"
              style={{ height: '20pt', marginLeft: '14pt' }}
            />
          </div>
        </div>
      </h3>
    </Styles>
  );
}
