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
import { ColorFormatters } from '@superset-ui/chart-controls';
import {
  ContextMenuFilters,
  QueryFormData,
  // supersetTheme,
  TimeFormatter,
  QueryFormMetric,
  TimeseriesDataRecord,
  ValueFormatter,
} from '@superset-ui/core';
import { ECharts } from 'echarts';
// import { RefObject } from 'react';

export interface VerticalNumberDatum {
  data: number;
}

export type BigNumberTotalFormData = QueryFormData & {
  metric?: QueryFormMetric;
  yAxisFormat?: string;
  forceTimestampFormatting?: boolean;
};

export type TimeSeriesDatum = [number, number | null];

export type EventHandlers = Record<string, { (props: any): void }>;

export interface EchartsHandler {
  getEchartInstance: () => ECharts | undefined;
}

export type PluginChartMESVerticalNumbersStylesProps = {
  className?: string;
  width: number;
  height: number;
  values?: VerticalNumberDatum[];
  headerFormatter: ValueFormatter | TimeFormatter;
  formatTime?: TimeFormatter;
  headerFontSize: number;
  numberFontSize: number;
  subHeader: string;
  subheaderFontSize: number;
  contentTitles: string;
  contentTitle1FontSize: number;
  mainColor?: string;
  onContextMenu?: (
    clientX: number,
    clientY: number,
    filters?: ContextMenuFilters,
  ) => void;
  colorThresholdFormatters?: ColorFormatters;
};

interface PluginChartMESVerticalNumbersStylesPropss {
  headerText: string;
  number: number;
}

export type PluginChartMESVerticalNumbersQueryFormData = QueryFormData &
  PluginChartMESVerticalNumbersStylesProps &
  PluginChartMESVerticalNumbersStylesPropss;

export type PluginChartTvDbProps = PluginChartMESVerticalNumbersStylesProps &
  PluginChartMESVerticalNumbersStylesPropss & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
  };