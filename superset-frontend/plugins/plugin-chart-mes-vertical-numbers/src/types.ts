import { QueryFormData, TimeseriesDataRecord } from '@superset-ui/core';

export interface PluginChartMESVerticalNumbersStylesProps {
  height: number;
  width: number;
  boldText: boolean;
}

interface PluginChartMESVerticalNumbersCustomizeProps {
  headerText: string;
}

export type PluginChartMESVerticalNumbersQueryFormData = QueryFormData &
  PluginChartMESVerticalNumbersStylesProps &
  PluginChartMESVerticalNumbersCustomizeProps;

export type PluginChartMESVerticalNumbersProps =
  PluginChartMESVerticalNumbersStylesProps &
    PluginChartMESVerticalNumbersCustomizeProps & {
      data: TimeseriesDataRecord[];
      // add typing here for the props you pass in from transformProps.ts!
    };
