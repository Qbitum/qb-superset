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

  renderNumber(maxHeight: number) {
    const { values, headerFormatter, width, colorThresholdFormatters } =
      this.props;

    console.log('============> this is my dataset:', values);
    // @ts-ignore
    const text = values === null ? t('No data') : headerFormatter(values);
    const hasThresholdColorFormatter =
      Array.isArray(colorThresholdFormatters) &&
      colorThresholdFormatters.length > 0;
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

  renderSubheader(maxHeight: number) {
    const { bigNumber, subHeader, width, bigNumberFallback } = this.props;
    let fontSize = 0;
    console.log(this.props, 'this.props');
    console.log(subHeader, bigNumber, 'git');

    const NO_DATA_OR_HASNT_LANDED = t(
      'No data after filtering or data is NULL for the latest time record',
    );
    const NO_DATA = t(
      'Try applying different filters or ensuring your datasource has data',
    );
    let text = subHeader;
    if (bigNumber === null) {
      text = bigNumberFallback ? NO_DATA : NO_DATA_OR_HASNT_LANDED;
    }
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
      container.remove();

      return (
        <div
          className="subheader-line"
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

  renderContentTitle1(maxHeight: number) {
    const { bigNumber, contentTitle1, width, bigNumberFallback } = this.props;
    let fontSize = 0;
    console.log(this.props, 'this.props');
    console.log(contentTitle1, bigNumber, 'git');

    const NO_DATA_OR_HASNT_LANDED = t(
      'No data after filtering or data is NULL for the latest time record',
    );
    const NO_DATA = t(
      'Try applying different filters or ensuring your datasource has data',
    );
    let text = contentTitle1;
    if (bigNumber === null) {
      text = bigNumberFallback ? NO_DATA : NO_DATA_OR_HASNT_LANDED;
    }
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
      console.log('qaaa', text);

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

  renderContentTitle2(maxHeight: number) {
    const { bigNumber, contentTitle2, width, bigNumberFallback } = this.props;
    let fontSize = 0;
    console.log(this.props, 'this.props');
    console.log(contentTitle2, bigNumber, 'git');

    const NO_DATA_OR_HASNT_LANDED = t(
      'No data after filtering or data is NULL for the latest time record',
    );
    const NO_DATA = t(
      'Try applying different filters or ensuring your datasource has data',
    );
    let text = contentTitle2;
    if (bigNumber === null) {
      text = bigNumberFallback ? NO_DATA : NO_DATA_OR_HASNT_LANDED;
    }
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
      // console.log('qaaa', text);

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

  renderContentTitle3(maxHeight: number) {
    const { bigNumber, contentTitle3, width, bigNumberFallback } = this.props;
    let fontSize = 0;
    console.log(this.props, 'this.props');
    console.log(contentTitle3, bigNumber, 'git');

    const NO_DATA_OR_HASNT_LANDED = t(
      'No data after filtering or data is NULL for the latest time record',
    );
    const NO_DATA = t(
      'Try applying different filters or ensuring your datasource has data',
    );
    let text = contentTitle3;
    if (bigNumber === null) {
      text = bigNumberFallback ? NO_DATA : NO_DATA_OR_HASNT_LANDED;
    }
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
      console.log('qaaa', text);

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
      numberFontSize,
      subheaderFontSize,
      contentTitle2FontSize,
      contentTitle3FontSize,
      contentTitle1FontSize,
    } = this.props;
    const className = this.getClassName();
    return (
      <>
        <div className={className} style={{ height }}>
          {/* {this.renderFallbackWarning()} */}
          {this.renderSubheader(Math.ceil(subheaderFontSize * height))}
          <div className="content-container">
            {this.renderContentTitle1(
              Math.ceil(contentTitle1FontSize * height),
            )}
            {this.renderNumber(Math.ceil(numberFontSize * height))}
          </div>
          <div className="content-container">
            {this.renderContentTitle2(
              Math.ceil(contentTitle2FontSize * height),
            )}
            {this.renderNumber(Math.ceil(numberFontSize * height))}
          </div>
          <div className="content-container">
            {this.renderContentTitle3(
              Math.ceil(contentTitle3FontSize * height),
            )}
            {this.renderNumber(Math.ceil(numberFontSize * height))}
          </div>
          <data />
        </div>
      </>
    );
  }
}

export default styled(MESVerticalNumbers)`
  ${({ theme }) => `
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${theme.colors.primary.tvdbBg};

    .subheader-line {
      line-height: 1em;
      padding-bottom: 0;
      color: #FFFFFF;
      font-size: 20px;
    }

    .content-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.contentTitle-line {
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
      color: #8A98AB;

}

.number-line {
  font-family: Roboto;
  font-size: 200px;
  font-style: normal;
  font-weight: 700;
      color: #8A98AB;
  text-align: right;
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
