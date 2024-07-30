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
import { HozValue, PluginMesHozNumbersStylesProps } from './types';

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
  SUBTITLE: 0.125,
  SUBVALUE: 0.125,
};

class MesHozNumbers extends React.PureComponent<PluginMesHozNumbersStylesProps> {
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
    subtitle: '',
    subValueFontSize: PROPORTION.SUBVALUE,
    subTitleFontSize: PROPORTION.SUBTITLE,
  };

  getClassName() {
    const { className, showTrendLine, bigNumberFallback } = this.props;
    const names = `component-body ${className} ${
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

  // renderTitle(maxHeight: number) {
  //   const { subHeader, width } = this.props;
  //   let fontSize = 0;

  //   const text = subHeader;

  //   if (text) {
  //     const container = this.createTemporaryContainer();
  //     document.body.append(container);
  //     fontSize = computeMaxFontSize({
  //       text,
  //       maxWidth: width,
  //       maxHeight,
  //       className: 'subheader-line',
  //       container,
  //     });
  //     // fontColor;
  //     container.remove();

  //     return (
  //       <div
  //         className="subheader-line"
  //         style={{
  //           fontSize,
  //           height: maxHeight,
  //         }}
  //       >
  //         {text}
  //       </div>
  //     );
  //   }
  //   return null;
  // }

  renderNoOfColumns(maxHeight: number) {
    const { bigNumber, headerFormatter, width, fontColor } = this.props;

    // @ts-ignore
    const text = bigNumber === null ? t('No data') : headerFormatter(bigNumber);

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
          color: fontColor,
        }}
        onContextMenu={onContextMenu}
      >
        {text}
      </div>
    );
  }

  renderSubValue(numberValue = 0, maxHeight: number) {
    const { bigNumber, width, colorThresholdFormatters } = this.props;

    let recurrenceValue = numberValue;
    if (typeof numberValue === 'string') {
      recurrenceValue = (numberValue as any).substring(0, 3);
    }
    // @ts-ignore
    const text = recurrenceValue === 0 ? t('-') : String(recurrenceValue);
    const txt = text.substring(0, 2);

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
        className="subvalue-line"
        style={{
          fontSize,
          height: maxHeight,
          color: numberColor,
        }}
        onContextMenu={onContextMenu}
      >
        {txt}
      </div>
    );
  }

  renderSubTitle(maxHeight: number, title: string) {
    const { width } = this.props;
    let fontSize = 0;
    // console.log(this.props,"this.props");

    const text = title;
    // console.log("vvv", text);

    if (text) {
      const container = this.createTemporaryContainer();
      document.body.append(container);
      fontSize = computeMaxFontSize({
        text,
        maxWidth: width - 12, // Decrease 8px for more precise font size
        maxHeight: maxHeight - 12,
        className: 'subtitle-line',
        container,
      });
      // fontColor;
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
          {text}
        </div>
      );
    }
    return null;
  }

  render() {
    const { height, values, subTitleFontSize, subtitle, headerFontSize } =
      this.props;

    const className = this.getClassName();

    // prepare view model
    const viewModel: HozValue[] = [];

    if (values) {
      values.forEach((val, i) => {
        viewModel.push({
          title: subtitle[i],
          data: val.data || 0,
        });
      });
    }

    return (
      <div className={className}>
        <div className="component-body">
          <div className="block-wrapper">
            {viewModel.map((dataItem, i) => (
              <div className="num-block" key={i}>
                {this.renderSubValue(
                  dataItem.data,
                  Math.ceil(headerFontSize * height),
                )}
                {this.renderSubTitle(
                  Math.ceil(subTitleFontSize * height),
                  dataItem.title,
                )}
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
    font-family: ${theme.tvDb.font.roboto};
    background-color: ${theme.tvDb.bg.tvDbBg};
    padding: ${theme.tvDb.gridUnit * 4}px;
    height:100%;

    .subheader-line {
      line-height: 1em;
      padding-bottom: 0;
      color: ${theme.tvDb.fontColor.white};
      font-size: 2em;
    }
    .component-body {
      padding:${theme.tvDb.component.padding};
      width: 100%;
      height: 100%;
    }
    
    .block-wrapper{
    display:flex;
    justify-content: space-around;
    }
    
    .num-block{
    display: flex;
    flex-direction:column;
    }

    .subvalue-line {
      line-height: 1em;
      font-size: 8vw;
      font-weight:${theme.tvDb.fontWeights.bold};
      white-space: nowrap;
      color: ${theme.tvDb.fontColor.gray80};
    }

    .subtitle-line {
      color: ${theme.tvDb.fontColor.white};
      line-height: 1em;
      padding-bottom: 0;
      color: ${theme.tvDb.fontColor.gray80};
      font-weight:bold;
    }
  `}
`;
