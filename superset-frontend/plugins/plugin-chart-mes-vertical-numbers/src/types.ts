import { ColorFormatters } from '@superset-ui/chart-controls';
import {
  ContextMenuFilters,
  DataRecordValue,
  QueryFormData,
  // supersetTheme,
  TimeFormatter,
  QueryFormMetric,
  TimeseriesDataRecord,
  ValueFormatter,
} from '@superset-ui/core';
import { EChartsCoreOption } from 'echarts';
import { RefObject } from 'react';
// import { Refs } from '../types';

export interface VerticalNumberValue {
  title: string;
  data: number;
}

export type BigNumberTotalFormData = QueryFormData & {
  metric?: QueryFormMetric;
  yAxisFormat?: string;
  forceTimestampFormatting?: boolean;
};

export type TimeSeriesDatum = [number, number | null];

export type EventHandlers = Record<string, { (props: any): void }>;

export type Refs = {
  divRef?: RefObject<HTMLDivElement>;
};

export type PluginChartMESVerticalNumbersStylesProps = {
  className?: string;
  width: number;
  height: number;
  bigNumber?: DataRecordValue;
  values?: VerticalNumberValue[];
  bigNumberFallback?: TimeSeriesDatum;
  headerFormatter: ValueFormatter | TimeFormatter;
  headerFontSize: number;
  subHeader: string;
  subheaderFontSize: number;
  startYAxisAtZero?: boolean;
  timeRangeFixed?: boolean;
  timestamp?: DataRecordValue;
  trendLineData?: TimeSeriesDatum[];
  mainColor?: string;
  echartOptions?: EChartsCoreOption;
  onContextMenu?: (
    clientX: number,
    clientY: number,
    filters?: ContextMenuFilters,
  ) => void;
  xValueFormatter?: TimeFormatter;
  refs: Refs;
  colorThresholdFormatters?: ColorFormatters;
  fontColor: string;
  subValue: string;
  subtitle: string;
  subValueFontSize: number;
  subTitleFontSize: number;
  noOfColumns: number;
  enteredValue: Array<number>;
  enteredValueString: Array<string>;
};

interface PluginChartMESVerticalNumbersCustomizeProps {
  headerText: string;
  number: number;
}

export type PluginMesHozNumbersQueryFormData = QueryFormData &
  PluginChartMESVerticalNumbersStylesProps &
  PluginChartMESVerticalNumbersCustomizeProps;

export type PluginMesHozNumbersProps =
  PluginChartMESVerticalNumbersStylesProps &
    PluginChartMESVerticalNumbersCustomizeProps & {
      data: TimeseriesDataRecord[];
      // add typing here for the props you pass in from transformProps.ts!
    };
