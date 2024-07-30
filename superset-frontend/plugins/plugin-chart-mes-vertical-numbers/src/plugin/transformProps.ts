import {
  ChartProps,
  formatTime,
  GenericDataType,
  getValueFormatter,
} from '@superset-ui/core';
import {
  ColorFormatters,
  getColorFormatters,
} from '@superset-ui/chart-controls';
import { VerticalNumberValue } from '../types';

export default function transformProps(chartProps: ChartProps) {
  const {
    width,
    height,
    formData,
    queriesData,
    datasource: { columnFormats = {}, symbolFormats = {} },
  } = chartProps;

  const {
    boldText,
    headerFontSize,
    headerText,
    subheader = '',
    subheaderFontSize,
    selectedSymbol,
    metric = 'value',
    fontColor,
    currencyFormat,
    forceTimestampFormatting,
    yAxisFormat,
    subtitle = '',
    noOfColumns = 0,
    subTitleFontSize,
    subValue,
    subValueFontSize,
    header = '',
    conditionalFormatting,
  } = formData;

  const formattedSubheader = subheader.toUpperCase();
  const formattedSubTitle =
    subtitle !== ''
      ? subtitle
          .toUpperCase()
          .split(',')
          .filter((value: string) => value !== '')
      : [];
  const { data = [], coltypes = [] } = queriesData[0];
  const formattedHeader =
    header !== ''
      ? header
          .toUpperCase()
          .split(',')
          .filter((value: string) => value !== '')
      : [];
  const numberFormatter = getValueFormatter(
    metric,
    symbolFormats,
    columnFormats,
    yAxisFormat,
    currencyFormat,
    selectedSymbol,
  );

  const headerFormatter =
    coltypes[0] === GenericDataType.Temporal ||
    coltypes[0] === GenericDataType.String ||
    forceTimestampFormatting
      ? formatTime
      : numberFormatter;

  const values: VerticalNumberValue[] = []; // transform query result to component model
  // Extract values from the data
  const vals = data.length > 0 ? Object.values(data[0]) : [];
  // create default dataset TODO: fill empty values
  formattedSubTitle.forEach((subt: string) => {
    values.push({ title: subt, data: 0 });
  });
  vals.forEach((datum: any, i: number) => {
    if (formattedSubTitle.length > i) {
      values[i] = { ...{}, ...{ title: formattedSubTitle[i], data: datum } };
    }
  });

  const defaultColorFormatters = [] as ColorFormatters;

  const colorThresholdFormatters =
    getColorFormatters(conditionalFormatting, data, false) ??
    defaultColorFormatters;

  return {
    width,
    height,
    values,
    selectedSymbol,
    boldText,
    headerFontSize,
    headerFormatter,
    headerText,
    subHeader: formattedSubheader,
    subheaderFontSize,
    fontColor,
    subtitle: formattedSubTitle,
    subTitleFontSize,
    subValue,
    subValueFontSize,
    noOfColumns,
    header: formattedHeader,
    colorThresholdFormatters,
  };
}
