import React, { MouseEvent } from 'react';
import {
  t,
  getNumberFormatter,
  computeMaxFontSize,
  styled,
} from '@superset-ui/core';
import { PluginChartMESVerticalNumbersStylesProps } from './types';

const defaultNumberFormatter = getNumberFormatter();

const PROPORTION = {
  SUBHEADER: 0.3,
  NUMBER: 0.3,
  CONTENTTITLE: 0.125,
  CONTENTTITLE1: 0.125,
  CONTENTTITLE2: 0.125,
  CONTENTTITLE3: 0.125,
};

class MESVerticalNumbers extends React.PureComponent<PluginChartMESVerticalNumbersStylesProps> {
  static defaultProps = {
    className: '',
    headerFormatter: defaultNumberFormatter,
    numberFormatter: defaultNumberFormatter,
    startYAxisAtZero: true,
    number: '',
    subHeader: '',
    subheaderFontSize: PROPORTION.SUBHEADER,
    contentTitle: '',
    contentTitleFontSize: PROPORTION.CONTENTTITLE,
    contentTitle1: '',
    contentTitle1FontSize: PROPORTION.CONTENTTITLE1,
    contentTitle2: '',
    contentTitle2FontSize: PROPORTION.CONTENTTITLE1,
    contentTitle3: '',
    contentTitle3FontSize: PROPORTION.CONTENTTITLE1,
  };

  getClassName() {
    const { className } = this.props;
    const names = `mes_number_view ${className}`;
    return `${names} no-trendline`;
  }

  createTemporaryContainer() {
    const container = document.createElement('div');
    container.className = this.getClassName();
    container.style.position = 'absolute'; // so it won't disrupt page layout
    container.style.opacity = '0'; // and not visible
    return container;
  }

  renderNumber(maxHeight: number, val: number) {
    const { values, headerFormatter, width, colorThresholdFormatters } =
      this.props;

    console.log('============> this is my dataset:', values);
    // @ts-ignore
    const text = values === null ? t('No data') : headerFormatter(val);
    const hasThresholdColorFormatter =
      Array.isArray(colorThresholdFormatters) &&
      colorThresholdFormatters.length > 0;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    let numberColor;
    if (hasThresholdColorFormatter) {
      colorThresholdFormatters!.forEach(formatter => {
        const formatterResult = values
          ? formatter.getColorFromValue(values as unknown as number)
          : false;
        if (formatterResult) {
          numberColor = formatterResult;
        }
      });
    } else {
      numberColor = 'white';
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */

    const container = this.createTemporaryContainer();
    document.body.append(container);
    const fontSize = computeMaxFontSize({
      text,
      maxWidth: width - 8,
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

  renderSubheader() {
    const { subHeader } = this.props;
    const text = subHeader;

    if (text) {
      return <div className="subheader-line">{text}</div>;
    }
    return null;
  }

  renderContentTitle(maxHeight: number, text: string) {
    const { width } = this.props;
    let fontSize = 0;
    if (text) {
      const container = this.createTemporaryContainer();
      document.body.append(container);
      fontSize = computeMaxFontSize({
        text,
        maxWidth: width,
        maxHeight,
        className: 'contentTitle-line',
        container,
      });
      container.remove();

      return (
        <div
          className="contentTitle-line"
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
    const {
      height,
      values,
      numberFontSize,
      contentTitles,
      contentTitle1FontSize,
    } = this.props;
    const className = this.getClassName();
    const labels = contentTitles.split(','); // TODO: should move this to transform class
    return (
      <>
        <div className={className} style={{ height }}>
          {this.renderSubheader()}
          <div className="component-body">
            {values?.map((val, i) => (
              <div className="content-container">
                {this.renderContentTitle(
                  Math.ceil(contentTitle1FontSize * height),
                  labels[i],
                )}
                {this.renderNumber(
                  Math.ceil(numberFontSize * height),
                  val.data,
                )}
              </div>
            ))}
          </div>
          <data />
        </div>
      </>
    );
  }
}

export default styled(MESVerticalNumbers)`
  ${({ theme }) => `
    font-family: ${theme.tvDb.font.roboto};
    font-style: ${theme.tvDb.fontStyles.normal};
    font-weight: ${theme.tvDb.fontWeights.normal};
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${theme.tvDb.bg.tvDbBg};

    .subheader-line {
      line-height: 1em;
      padding-bottom: 0;
      color: ${theme.tvDb.fontColor.white};
      font-size: 2em;
    }
    .component-body {
      padding:${theme.tvDb.component.padding};
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
    .content-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }

    .contentTitle-line {
      text-align: center;
      font-family: ${theme.tvDb.font.roboto};
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight:${theme.tvDb.fontWeights.normal};
      line-height: normal;
      color: ${theme.tvDb.fontColor.gray80};
    }

    .number-line {
      font-family: ${theme.tvDb.font.roboto};
      font-size: 200px;
      font-style: ${theme.tvDb.fontStyles.normal};
      font-weight: ${theme.tvDb.fontWeights.bold};
      color: ${theme.tvDb.fontColor.gray80};
      text-align: right;
    }
  `}
`;