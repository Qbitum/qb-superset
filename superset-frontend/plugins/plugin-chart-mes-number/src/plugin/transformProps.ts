import { ChartProps, getMetricLabel } from '@superset-ui/core';
import { parseMetricValue } from '../utils';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, numberText, numberFontSize, metric = 'value' } = formData;
  const metricName = getMetricLabel(metric);

  console.log('formData via TransformProps.ts', formData);
  const { data = [] } = queriesData[0];
  const bigNumber =
    data.length === 0 ? null : parseMetricValue(data[0][metricName]);

  return {
    width,
    height,
    bigNumber,
    boldText,
    // and now your control data, manipulated as needed, and passed through as props!
    numberFontSize,
    numberText,
  };
}
