import React, { MouseEvent } from 'react';
import {
  t,
  getNumberFormatter,
  computeMaxFontSize,
  BRAND_COLOR,
  styled,
} from '@superset-ui/core';
import {
  VerticalNumberValue,
  PluginChartMESVerticalNumbersStylesProps,
} from './types';

const defaultNumberFormatter = getNumberFormatter();

const PROPORTION = {
  // text size: proportion of the chart container sans trendline
  HEADER: 0.3,
  SUBHEADER: 0.125,
  SUBTITLE: 0.125,
  SUBVALUE: 0.125,
};

class MesVerticalNumbers extends React.PureComponent<PluginChartMESVerticalNumbersStylesProps> {
  static defaultProps = {
    className: '',
    headerFormatter: defaultNumberFormatter,
    // formatTime: smartDateVerboseFormatter,
    headerFontSize: PROPORTION.HEADER,
    mainColor: BRAND_COLOR,
    // showTimestamp: false,
    // showTrendLine: false,
    startYAxisAtZero: true,
    // subHeader: '',
    subheaderFontSize: PROPORTION.SUBHEADER,
    // timeRangeFixed: false,
    // subtitle: '',
    subValueFontSize: PROPORTION.SUBVALUE,
    subTitleFontSize: PROPORTION.SUBTITLE,
  };

  getClassName() {
    const { className, bigNumberFallback } = this.props;
    const names = `component-body ${className} ${
      bigNumberFallback ? 'is-fallback-value' : ''
    }`;
    // if (showTrendLine) return names;
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

  renderSubValue(numberValue = 0) {
    const { fontColor } = this.props;
    let recurrenceValue = numberValue;
    if (typeof numberValue === 'string') {
      recurrenceValue = (numberValue as any).substring(0, 3);
    }
    // @ts-ignore
    const text = recurrenceValue === 0 ? t('-') : String(recurrenceValue);

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
          color: fontColor,
        }}
        onContextMenu={onContextMenu}
      >
        {text}
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
    const { height, values, subTitleFontSize, subtitle } = this.props;

    const className = this.getClassName();

    // prepare view model
    const viewModel: VerticalNumberValue[] = [];

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
                <div className="subtitle-and-value">
                  <div className="contentTitle-line">
                    {this.renderSubTitle(
                      Math.ceil(subTitleFontSize * height),
                      dataItem.title,
                    )}
                  </div>
                  <div className="number-line">
                    {this.renderSubValue(dataItem.data)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default styled(MesVerticalNumbers)`
  ${({ theme }) => `
    background-color: ${theme.tvDb.bg.tvDbBg};
    padding: 0 ${theme.tvDb.gridUnit * 4}px;
    border-radius: ${theme.gridUnit * 2}px;
    height: 100%;
    width: 100%;

    .component-body {
      padding: ${theme.tvDb.component.padding};
      width: 100%;
      height: 100%;
    }

    .block-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }

    .num-block {
      display: flex;
      flex-direction: column;
      margin-bottom: ${theme.tvDb.gridUnit * 2}px;
    }

    .subtitle-and-value {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: ${theme.tvDb.gridUnit * 2}px;
    }

    .number-line {
      font-family: ${theme.tvDb.font.roboto};
      font-size: 4vw;
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight: ${theme.tvDb.fontWeights.bold};
      color: ${theme.tvDb.fontColor.white};
      text-align: right;
      line-height: 1em;
       align-content: center;
    }

    .contentTitle-line {
      font-family: ${theme.tvDb.font.roboto};
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight: ${theme.tvDb.fontWeights.normal};
      font-size: 4vw;
      text-align: left;
      align-content: center;
    }

    .subheader-line {
      line-height: 1em;
      padding-bottom: 0;
      color: ${theme.tvDb.fontColor.white};
      font-size: 2em;
    }

    .subtitle-line {
      color: ${theme.tvDb.fontColor.gray80};
      line-height: 1em;
      padding-bottom: 0;
      align-content: center;

    }
  `}
`;
