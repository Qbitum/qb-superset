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
import { PluginChartTvDashboardStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const defaultNumberFormatter = getNumberFormatter();

const PROPORTION = {
  // text size: proportion of the chart container sans trendline
  HEADER: 0.3,
  SUBHEADER: 0.125,
};

class TvDashboard extends React.PureComponent<PluginChartTvDashboardStylesProps> {
  static defaultProps = {
    className: '',
    headerFormatter: defaultNumberFormatter,
    formatTime: smartDateVerboseFormatter,
    headerFontSize: PROPORTION.HEADER,
    mainColor: BRAND_COLOR,
    showTimestamp: false,
    showTrendLine: false,
    startYAxisAtZero: true,
    subHeader: '',
    subheaderFontSize: PROPORTION.SUBHEADER,
    timeRangeFixed: false,
  };

  getClassName() {
    const { className, showTrendLine } = this.props;
    const names = `superset-legacy-chart-big-number component-body ${className}`;
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

  renderValue(maxHeight: number) {
    const { bigNumber, width, symbolSelect, colorThresholdFormatters } =
      this.props;

    // @ts-ignore
    let formattedNumber: string;

    // if (bigNumber === null) {
    //   formattedNumber = t('-');
    // } else if (typeof bigNumber === 'number') {
    //   const bigNumberStr = bigNumber.toString();
    //   const [integerPart] = bigNumberStr.split('.');
    //   formattedNumber = integerPart.substring(0, 3);
    // } else if (typeof bigNumber === 'string') {
    //   formattedNumber = parseFloat(bigNumber).toFixed(2);
    // } else {
    //   formattedNumber = String(bigNumber);
    // }

    if (bigNumber === null) {
      formattedNumber = t('-');
    } else if (typeof bigNumber === 'number' || typeof bigNumber === 'string') {
      const bigNumberFloat = (parseFloat as any)(bigNumber);
      if (Number.isNaN(bigNumberFloat)) {
        formattedNumber = String(bigNumber);
      } else {
        const bigNumberStr = bigNumberFloat.toString();
        const [integerPart, decimalPart] = bigNumberStr.split('.');

        if (decimalPart) {
          formattedNumber = bigNumberFloat.toFixed(2);
        } else {
          formattedNumber = integerPart.substring(0, 3);
        }
      }
    } else {
      formattedNumber = String(bigNumber);
    }

    const text =
      symbolSelect !== undefined && formattedNumber !== t('-')
        ? formattedNumber + symbolSelect
        : formattedNumber;

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
      numberColor = 'white';
    }

    const container = this.createTemporaryContainer();
    document.body.append(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: width - 8, // Decrease 8px for more precise font size
      maxHeight,
      className: 'header-line',
      container,
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
          color: numberColor,
        }}
        onContextMenu={onContextMenu}
      >
        {text}
      </div>
    );
  }

  render() {
    const { height, headerFontSize } = this.props;
    const className = this.getClassName();

    return (
      <>
        <div className={className} style={{ height }}>
          {this.renderValue(Math.ceil(headerFontSize * height))}
        </div>
      </>
    );
  }
}

export default styled(TvDashboard)`
  ${({ theme }) => `
font-family: ${theme.tvDb.font.roboto};
font-style: ${theme.tvDb.fontStyles.normal};
font-weight: ${theme.tvDb.fontWeights.normal};
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; 
background-color: ${theme.tvDb.bg.tvDbBg};
.component-body {
      padding:${theme.tvDb.component.padding};
      width: 100%;
      height: 100%;
    }
.header-line {
  line-height: 1em;
  white-space: nowrap;
  text-edge: cap;
  font-family: ${theme.tvDb.font.roboto};  
  font-style: ${theme.tvDb.fontStyles.normal};
  font-weight: ${theme.tvDb.fontWeights.bold};
  color: ${theme.tvDb.fontColor.white};
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%;
  height: 100%;
  position: relative; 
  span {
    position: absolute;
    bottom: 0;
  }
}
`}
`;
