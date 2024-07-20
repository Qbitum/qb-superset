/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { MouseEvent } from 'react';
import {
  t,
  getNumberFormatter,
  smartDateVerboseFormatter,
  computeMaxFontSize,
  BRAND_COLOR,
  styled,
} from '@superset-ui/core';
import {
  HozValue,
  PluginMesHozNumbersStylesProps,
} from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const defaultNumberFormatter = getNumberFormatter();

const PROPORTION = {
  // text size: proportion of the chart container sans trendline
  KICKER: 0.1,
  HEADER: 0.3,
  SUBHEADER: 0.125,
  SUBTITLE: 0.125,
  SUBVALUE: 0.125,
  // trendline size: proportion of the whole chart container
  TRENDLINE: 0.3,
};

class MesHozNumbers extends React.PureComponent<PluginMesHozNumbersStylesProps> {
  static defaultProps = {
    className: '',
    headerFormatter: defaultNumberFormatter,
    formatTime: smartDateVerboseFormatter,
    headerFontSize: PROPORTION.HEADER,
    kickerFontSize: PROPORTION.KICKER,
    mainColor: BRAND_COLOR,
    showTimestamp: false,
    showTrendLine: false,
    startYAxisAtZero: true,
    subHeader: '',
    subheaderFontSize: PROPORTION.SUBHEADER,
    timeRangeFixed: false,
    subtitle: '',
    subValueFontSize: PROPORTION.SUBVALUE,
    subTitleFontSize: PROPORTION.SUBTITLE
    
  };

  getClassName() {
    const { className, showTrendLine, bigNumberFallback } = this.props;
    const names = `superset-legacy-chart-big-number ${className} ${
      bigNumberFallback ? 'is-fallback-value' : ''
    }`;
    if (showTrendLine) return names;
    return `${names} no-trendline`;
  }

  createTemporaryContainer() {
    const container = document.createElement('div');
    container.className = this.getClassName();
    container.style.position = 'absolute'; // so it won't disrupt page layout
    container.style.opacity = '0'; // and not visible
    return container;
  }

  renderTitle(maxHeight: number) {
    // console.log(maxHeight, "title");
    
    const { subHeader, width, fontColor } = this.props;
    let fontSize = 0;
    // console.log(fontColor,"this.props");
    // console.log(subHeader,bigNumber,"git");

    let text = subHeader;
  
    if (text) {
      const container = this.createTemporaryContainer();
      document.body.append(container);
      fontSize = computeMaxFontSize({
        text,
        maxWidth: width,
        maxHeight,
        className: 'subheader-line',
        container,
      });
      fontColor
      container.remove();

      // console.log("font color", fontColor);

      return (
        <div
          className="subheader-line"
          style={{
            fontSize,
            height: maxHeight        
          }}          
        >
          {text}
        </div>
      );
    }
    return null;
  }

  renderNoOfColumns(maxHeight: number) {
    // console.log(maxHeight,"bhbhbhbhb");
    
    const { bigNumber, headerFormatter, width, colorThresholdFormatters,fontColor } = this.props;
      
// console.log("noofColums",noOfColumns);

    // @ts-ignore
    const text = bigNumber === null ? t('No data') : headerFormatter(bigNumber);
    // console.log("y",text);
    
    const hasThresholdColorFormatter =
      Array.isArray(colorThresholdFormatters) &&
      colorThresholdFormatters.length > 0;

    let numberColor;
    if (hasThresholdColorFormatter) {
      colorThresholdFormatters!.forEach(formatter => {
        const formatterResult = bigNumber
          ? formatter.getColorFromValue(bigNumber as number)
          : false;
        if (formatterResult) {
          numberColor = formatterResult;
        }
      });
    } else {
      numberColor = 'black';
    }

    const container = this.createTemporaryContainer();
    document.body.append(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: width - 8, // Decrease 8px for more precise font size
      maxHeight,
      className: 'header-line',
      container
    });
    container.remove();

    const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
      if (this.props.onContextMenu) {
        e.preventDefault();
        this.props.onContextMenu(e.nativeEvent.clientX, e.nativeEvent.clientY);
      }
    };

    return (
      
      <div
        className="header-line"
        style={{
          fontSize,
          height: maxHeight,
          color: fontColor,
        }}
        onContextMenu={onContextMenu}
      >
        {text}
      </div>
    );
  }

  renderSubValue(maxHeight: number, numberValue=0) {
    
    const { width,fontColor } = this.props;
      
    // @ts-ignore
    const text = numberValue === 0 ? t('No data') : numberValue+'';
  
    const container = this.createTemporaryContainer();
    document.body.append(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: width - 8, // Decrease 8px for more precise font size
      maxHeight,
      className: 'subvalue-line',
      container
    });
    container.remove();

    const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
      if (this.props.onContextMenu) {
        e.preventDefault();
        this.props.onContextMenu(e.nativeEvent.clientX, e.nativeEvent.clientY);
      }
    };

    return (
      
      <div
        className="subvalue-line"
        style={{
          fontSize,
          height: maxHeight,
          color: fontColor,
        }}
        onContextMenu={onContextMenu}
      >
        {text}
      </div>
    );
  }

  renderSubTitle(maxHeight: number,title:string) {
    
    const { width, fontColor } = this.props;
    let fontSize = 0;
    // console.log(this.props,"this.props");

    let text = title;
    // console.log("vvv", text);
    
    if (text) {
      const container = this.createTemporaryContainer();
      document.body.append(container);
      fontSize = computeMaxFontSize({
        text,
        maxWidth: width,
        maxHeight,
        className: 'subtitle-line', 
        container,
      });
      fontColor
      container.remove();

      // console.log("font color", fontColor);

      return (
        <div
          className="subtitle-line"
          style={{
            fontSize,
            height: maxHeight,        
          }}          
        >
          {/* {fontColor} */}
          {text}
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      height,
      values,
      subheaderFontSize,
      subValueFontSize,
      subTitleFontSize,
      subtitle,
      // subValue
      // noOfColumns
    } = this.props;
    
    const className = this.getClassName();

    // console.log(noOfColumns,"subheaderFontSize");

      const chartHeight = Math.floor(PROPORTION.TRENDLINE * height);
      const allTextHeight = height - chartHeight;
      
      // prepare view model
      let viewModel:HozValue[]=[];

      if (values) {
        values.forEach((val,i) =>{
          viewModel.push({
            title: subtitle[i],
            data: val.data || 0
          })
        })
      
      }
      console.log(viewModel,"viewModel");
      

      return (
        <div className={className}>
            {this.renderTitle(
              Math.ceil(subheaderFontSize * (1 - PROPORTION.TRENDLINE) * height),
            )}
          <div className="text-container" style={{ height: allTextHeight }}>
          
          <div className='container'>
            {viewModel.map((dataItem, i) => (
              <div key={i} style={{ paddingRight: '3em' }}>
                {this.renderSubValue(Math.ceil(subValueFontSize * height),dataItem.data)}
                {this.renderSubTitle(Math.ceil(subTitleFontSize * height), dataItem.title)}
              </div>
            ))}
            </div>
          </div>
        </div>
      );
  }
}

export default styled(MesHozNumbers)`
   ${({ theme }) => `
    font-family: ${theme.typography.families.sansSerif};
    background-color: black;
    padding: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &.no-trendline .subheader-line {
      padding-bottom: 0.3em;
    }

    .text-container {
      display: flex;
      flex-wrap: wrap; /* Allow wrapping */
      justify-content: center;
      align-items: flex-start;
      
      .alert {
        font-size: ${theme.typography.sizes.s};
        margin: -0.5em 0 0.4em;
        line-height: 1;
        padding: ${theme.gridUnit}px;
        border-radius: ${theme.gridUnit}px;
      }
    }

    .container {
    display: flex;
    }

    .kicker {
      line-height: 1em;
      padding-bottom: 2em;
    }

    .header-line {
      position: relative;
      line-height: 1em;
      white-space: nowrap;
      span {
        position: absolute;
        bottom: 0;
      }
    }

    .subheader-line {
      color: white;
      line-height: 1em;
      padding-bottom: 0;
    }

    .subvalue-line {
      position: relative;
      line-height: 1em;
      white-space: nowrap;
      span {
        position: absolute;
        bottom: 0;
      }
    }

    .subtitle-line {
      color: white;
      line-height: 1em;
      padding-bottom: 0;
    }

    &.is-fallback-value {
      .kicker,
      .header-line,
      .subheader-line {
        opacity: ${theme.opacity.mediumHeavy};
      }
    }
  `}
`;

// const Styles = styled.div<PluginChartTvDashboardStylesProps>`
//   background-color: ${({ theme }) => theme.colors.secondary.light2};
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     /* You can use your props to control CSS! */
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) =>
//       theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) =>
//       theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }

//   pre {
//     height: ${({ theme, headerFontSize, height }) =>
//       height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
//   }
// `;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

// export default function PluginChartTvDashboard(
//   props: PluginChartTvDashboardProps,
// ) {
//   // height and width are the height and width of the DOM element as it exists in the dashboard.
//   // There is also a `data` prop, which is, of course, your DATA 🎉
//   const { data, height, width, fontColor } = props;

//   const rootElem = createRef<HTMLDivElement>();

//   // Often, you just want to access the DOM and do whatever you want.
//   // Here, you can do that with createRef, and the useEffect hook.
//   useEffect(() => {
//     const root = rootElem.current as HTMLElement;
//     console.log('Plugin element', root);
//   });

//   console.log('Plugin props', props);

//   return (
//     <Styles
//       ref={rootElem}
//       boldText={props.boldText}
//       headerFontSize={props.headerFontSize}
//       height={height}
//       width={width}
//       fontColor={fontColor}
//     >
//       {/* <h3>{props.headerText}{props.fontColor}</h3> */}
//       {/* <pre>{props.headerText}</pre> */}
//       <pre>fhgfh{props.headerText}</pre>
      
//     </Styles>
//   );
// }

