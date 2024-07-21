import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
} from '@superset-ui/core';

export interface PluginChartMESVerticalNumbersStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
  subHeader: string;
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
