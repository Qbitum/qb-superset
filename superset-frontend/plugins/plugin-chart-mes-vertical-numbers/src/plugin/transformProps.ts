import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;
  const { boldText, subheader = 'Title', subheaderFontSize = 12 } = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];
  const formattedSubheader = subheader.toUpperCase();

  console.log('formData via TransformProps.ts', formData);

  return {
    width,
    height,
    data,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    subHeader: formattedSubheader,
    subheaderFontSize,
  };
}
