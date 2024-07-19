import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class PluginChartMESHeader extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'this is the header for mes',
      name: t('MES Header'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../PluginChartMESHeader'),
      metadata,
      transformProps,
    });
  }
}
