import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartMESHeaderProps,
  PluginChartMESHeaderStylesProps,
} from './types';
import Logo from './images/makeit-logo.png';

function getBoxStyle(index: number) {
  const styles = [
    'darkPurpleBadge',
    'lightPurpleBadge',
    'lightOrangeBadge',
    'darkGrayBadge',
    'darkGrayBadge',
    'greenBadge',
    'lightGrayBadge',
    'transparentBadge',
  ];
  return { classNames: styles[index % styles.length] };
}

const Styles = styled.div<PluginChartMESHeaderStylesProps>`
  background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: auto;
  width: 100%;
  padding: 4pt;

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
`;

const LightPurpleBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightPurplebg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  padding: 16px 20px;
`;

const DarkPurpleBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.darkPurplebg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
`;

const LightOrangeBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightOrangebg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  padding: 16px 20px;
`;
const DarkGrayBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.darkGraybg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
`;
const LightGrayBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.lightGraybg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
`;
const GreenBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.greenbg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
`;

const TransparentBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.transparentbg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
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
      <div
        className="flex"
        style={{
          alignContent: 'center',
        }}
      >
        <h3>
          <h2 style={{ marginRight: '15px', alignContent: 'center' }}>KPI</h2>
          {values.map(([key, value], index) => {
            const boxStyle = getBoxStyle(index);
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
                ) : boxStyle.classNames === 'greenBadge' ? (
                  <GreenBadgeStyled>{value}</GreenBadgeStyled>
                ) : boxStyle.classNames === 'lightGrayBadge' ? (
                  <LightGrayBadgeStyled>{value}</LightGrayBadgeStyled>
                ) : boxStyle.classNames === 'transparentBadge' ? (
                  <TransparentBadgeStyled>{value}</TransparentBadgeStyled>
                ) : (
                  value
                )}
              </header>
            );
          })}
          <div
            style={{
              display: 'flex',
              height: '30pt',
              marginLeft: '14pt',
              alignContent: 'right',
              alignItems: 'self-end',
            }}
          >
            |
            <img
              src={Logo}
              alt="Makeit Logo"
              style={{ height: '30pt', marginLeft: '14pt' }}
            />
          </div>
        </h3>
      </div>
    </Styles>
  );
}
