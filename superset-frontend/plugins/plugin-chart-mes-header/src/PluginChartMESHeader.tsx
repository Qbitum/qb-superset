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
  width: 100%;
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
    height: '30pt';
    marginleft: '14pt';
    alignitems: 'self-end';
    color: ${({ theme }) => theme.tvDb.fontColor.white};
    flexgrow: '3';
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
            paddingRight: '3rem',
            display: 'flex',
            alignItems: 'center',
            flexGrow: '1',
          }}
        >
          <h2 className="db-title">KPI</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexGrow: '6' }}>
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
            paddingRight: '3rem',
          }}
        >
          {values.map(([key, value], index) => {
            const boxStyle = getBoxStyle(index);
            if (
              boxStyle.classNames === 'greenBadge' ||
              boxStyle.classNames === 'transparentBadge'
            ) {
              return (
                <header
                  key={index}
                  style={{
                    marginRight: '15px',
                    ...boxStyle,
                  }}
                >
                  {boxStyle.classNames === 'greenBadge' ? (
                    <GreenBadgeStyled>{value}</GreenBadgeStyled>
                  ) : (
                    <TransparentBadgeStyled>{value}</TransparentBadgeStyled>
                  )}
                </header>
              );
            }
            return null;
          })}
          <div className="logo-wrapper">
            |
            <img
              src={Logo}
              alt="Makeit Logo"
              style={{ height: '30pt', marginLeft: '14pt' }}
            />
          </div>
        </div>
      </h3>
    </Styles>
  );
}

// import React, { useEffect, useState, createRef } from 'react';
// import { styled } from '@superset-ui/core';
// import {
//   PluginChartMESHeaderProps,
//   PluginChartMESHeaderStylesProps,
// } from './types';
// import Logo from './images/makeit-logo.png';

// function getBoxStyle(index: number) {
//   const styles = [
//     'darkPurpleBadge',
//     'lightPurpleBadge',
//     'lightOrangeBadge',
//     'darkGrayBadge',
//     'darkGrayBadge',
//     'lightGrayBadge',
//     'greenBadge',
//     'transparentBadge',
//   ];
//   return { classNames: styles[index % styles.length] };
// }

// const Styles = styled.div<PluginChartMESHeaderStylesProps>`
//   background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: auto;
//   width: 100%;
//   padding: 4pt;

//   h3 {
//     margin-top: 0;
//     margin-bottom: 0;
//     font-size: ${({ theme, headerFontSize }) =>
//       theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) =>
//       theme.typography.weights[boldText ? 'bold' : 'normal']};
//     background-color: ${({ theme }) => theme.tvDb.bg.tvDbBg};
//     color: ${({ theme }) => theme.tvDb.fontColor.white};
//     display: flex;
//     align-items: center;
//     height: 100%;
//   }
// `;

// const BadgeStyled = styled.div`
//   background-color: ${({ theme, bgColor }) => bgColor};
//   color: ${({ theme, fontColor }) => fontColor};
//   border-radius: 8px;
//   padding: 16px 20px;
//   margin-right: 15px;
// `;

// const WiFiBadgeStyled = styled.div`
//   background-color: ${({ status }) => (status ? 'green' : 'red')};
//   color: white;
//   border-radius: 8px;
//   padding: 16px 20px;
// `;

// export default function PluginChartMESHeader(props: PluginChartMESHeaderProps) {
//   const { data, height, width, boldText, headerFontSize } = props;

//   const rootElem = createRef<HTMLDivElement>();
//   const [isOnline, setIsOnline] = useState(true);

//   useEffect(() => {
//     const root = rootElem.current;
//     console.log('Plugin element', root);

//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//     };

//     window.addEventListener('online', updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);

//     return () => {
//       window.removeEventListener('online', updateOnlineStatus);
//       window.removeEventListener('offline', updateOnlineStatus);
//     };
//   }, []);

//   // Extract values from the data
//   const values = data.length > 0 ? Object.entries(data[0]) : [];

//   const colors = {
//     darkPurpleBadge: { bgColor: 'darkPurple', fontColor: 'white' },
//     lightPurpleBadge: { bgColor: 'lightPurple', fontColor: 'black' },
//     lightOrangeBadge: { bgColor: 'lightOrange', fontColor: 'black' },
//     darkGrayBadge: { bgColor: 'darkGray', fontColor: 'white' },
//     lightGrayBadge: { bgColor: 'lightGray', fontColor: 'white' },
//     greenBadge: { bgColor: 'green', fontColor: 'white' },
//     transparentBadge: { bgColor: 'transparent', fontColor: 'white' },
//   };

//   return (
//     <Styles
//       ref={rootElem}
//       boldText={boldText}
//       headerFontSize={headerFontSize}
//       height={height}
//       width={width}
//     >
//       <h3
//         className="flex"
//         style={{
//           alignContent: 'center',
//           justifyContent: 'space-between',
//           display: 'flex',
//         }}
//       >
//         <div
//           style={{
//             paddingRight: '3rem',
//             display: 'flex',
//             alignItems: 'center',
//             flexGrow: '1',
//           }}
//         >
//           <h2 style={{ margin: 0, color: 'white' }}>KPI</h2>
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', flexGrow: '6' }}>
//           {values.map(([key, value], index) => {
//             const boxStyle = getBoxStyle(index);
//             const { bgColor, fontColor } = colors[boxStyle.classNames];
//             if (boxStyle.classNames !== 'greenBadge' && boxStyle.classNames !== 'transparentBadge') {
//               return (
//                 <BadgeStyled key={index} bgColor={bgColor} fontColor={fontColor}>
//                   {value}
//                 </BadgeStyled>
//               );
//             }
//             return null;
//           })}
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', paddingRight: '3rem' }}>
//           {values.map(([key, value], index) => {
//             const boxStyle = getBoxStyle(index);
//             const { bgColor, fontColor } = colors[boxStyle.classNames];
//             if (boxStyle.classNames === 'greenBadge' || boxStyle.classNames === 'transparentBadge') {
//               return (
//                 <BadgeStyled key={index} bgColor={bgColor} fontColor={fontColor}>
//                   {value}
//                 </BadgeStyled>
//               );
//             }
//             return null;
//           })}
//           <WiFiBadgeStyled status={isOnline} style={{ marginRight: '15px' }}>
//             Wi-Fi
//           </WiFiBadgeStyled>
//           <div
//             style={{
//               display: 'flex',
//               height: '30pt',
//               marginLeft: '14pt',
//               alignItems: 'self-end',
//               color: 'white',
//               flexGrow: '3',
//             }}
//           >
//             |
//             <img
//               src={Logo}
//               alt="Makeit Logo"
//               style={{ height: '30pt', marginLeft: '14pt' }}
//             />
//           </div>
//         </div>
//       </h3>
//     </Styles>
//   );
// }
