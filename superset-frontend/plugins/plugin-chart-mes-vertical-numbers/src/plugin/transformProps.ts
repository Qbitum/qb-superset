import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, contentTitles = 'Label1, Label2,Label3' } = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];

  console.log('formData via TransformProps.ts', formData);

  return {
    width,
    height,
    data,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    contentTitles,
  };
}
