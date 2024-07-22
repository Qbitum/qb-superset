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
  computeMaxFontSize,
  BRAND_COLOR,
  styled,
} from '@superset-ui/core';
import { PluginChartMESNumberStylesProps } from './types';

const defaultNumberFormatter = getNumberFormatter();

class MESNumber extends React.PureComponent<PluginChartMESNumberStylesProps> {
  static defaultProps = {
    className: '',
    headerFormatter: defaultNumberFormatter,
    numberFormatter: defaultNumberFormatter,
    mainColor: BRAND_COLOR,
    number: '',
  };

  getClassName() {
    const { className, bigNumberFallback } = this.props;
    const names = `mes_number_view ${className} ${
      bigNumberFallback ? 'is-fallback-value' : ''
    }`;
    return `${names} no-trendline`;
  }

  createTemporaryContainer() {
    const container = document.createElement('div');
    container.className = this.getClassName();
    container.style.position = 'absolute'; // so it won't disrupt page layout
    container.style.opacity = '0'; // and not visible
    return container;
  }

  renderFallbackWarning() {
    const { bigNumberFallback, formatTime } = this.props;
    if (!formatTime || !bigNumberFallback) return null;
    return (
      <span
        className="alert alert-warning"
        role="alert"
        title={t(
          `Last available value seen on %s`,
          formatTime(bigNumberFallback[0]),
        )}
      >
        {t('Not up to date')}
      </span>
    );
  }

  renderNumber(maxHeight: number) {
    const { bigNumber, headerFormatter, width, colorThresholdFormatters } =
      this.props;
    // @ts-ignore
    const text = bigNumber === null ? t('No data') : headerFormatter(bigNumber);
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
      className: 'number-line',
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
        className="number-line"
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
    const { height, numberFontSize } = this.props;
    const className = this.getClassName();
    return (
      <>
        <div className={className} style={{ height }}>
          {this.renderFallbackWarning()}
          <div className="container">
            {this.renderNumber(Math.ceil(numberFontSize * height))}
          </div>
        </div>
      </>
    );
  }
}

export default styled(MESNumber)`
  ${({ theme }) => `
    font-family: ${theme.tvDb.font.roboto};
    font-style: ${theme.tvDb.fontStyles.normal};
    font-weight:${theme.tvDb.fontWeights.normal};
    padding: 16pt;
    align-items: flex-start;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${theme.tvDb.bg.tvDbBg};
    margin: 4pt;

    .number-line {
      line-height: 1em;
      white-space: nowrap;
      text-align: center;
      font-family: ${theme.tvDb.font.roboto};
      font-size: 200px;
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight:${theme.tvDb.fontWeights.bold};
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &.is-fallback-value {
      .kicker,
      .number-line,
      .subheader-line {
        opacity: ${theme.opacity.mediumHeavy};
      }
    }
  `}
`;
