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
import {
  ColorFormatters,
  getColorFormatters,
} from '@superset-ui/chart-controls';
import {
  ChartProps,
  formatTime,
  GenericDataType,
  getMetricLabel,
  getValueFormatter,
} from '@superset-ui/core';
import { parseMetricValue } from '../utils';

export default function transformProps(chartProps: ChartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your PluginChartHelloQbitum.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  const {
    width,
    height,
    formData,
    queriesData,
    datasource: { currencyFormats = {}, columnFormats = {} },
  } = chartProps;

  const {
    boldText,
    headerFontSize,
    headerText,
    subheader = '',
    subheaderFontSize,
    metric = 'value',
    fontColor,
    currencyFormat,
    forceTimestampFormatting,
    conditionalFormatting,
    yAxisFormat,
    symbolSelect,
  } = formData;
 
  const metricName = getMetricLabel(metric);
  const formattedSubheader = subheader.toUpperCase();
  const { data = [], coltypes = [] } = queriesData[0];
  const bigNumber =
    data.length === 0 ? null : parseMetricValue(data[0][metricName]);

  const numberFormatter = getValueFormatter(
    metric,
    currencyFormats,
    columnFormats,
    yAxisFormat,
    currencyFormat,
  );

  const headerFormatter =
    coltypes[0] === GenericDataType.Temporal ||
    coltypes[0] === GenericDataType.String ||
    forceTimestampFormatting
      ? formatTime
      : numberFormatter;

  const defaultColorFormatters = [] as ColorFormatters;

  const colorThresholdFormatters =
    getColorFormatters(conditionalFormatting, data, false) ??
    defaultColorFormatters;

  return {
    width,
    height,
    bigNumber,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    headerFontSize,
    headerFormatter,
    headerText,
    subHeader: formattedSubheader,
    subheaderFontSize,
    fontColor,
    currencyFormat,
    symbolSelect,
    colorThresholdFormatters
  };
}
