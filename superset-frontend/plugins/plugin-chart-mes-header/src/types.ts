import {
  QueryFormData,
  supersetTheme,
  TimeseriesDataRecord,
} from '@superset-ui/core';

export interface PluginChartMESHeaderStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface PluginChartMESHeaderCustomizeProps {
  headerText: string;
}

export type PluginChartMESHeaderQueryFormData = QueryFormData &
  PluginChartMESHeaderStylesProps &
  PluginChartMESHeaderCustomizeProps;

export type PluginChartMESHeaderProps = PluginChartMESHeaderStylesProps &
  PluginChartMESHeaderCustomizeProps & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
  };
