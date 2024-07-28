import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class PluginChartMesTop3List extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'this is the top 3 list plugin for tv dashboard',
      name: t('MES Top3 list'),
      exampleGallery: [{ url: thumbnail, caption: t('Top3 list') }],
      category: t('MES-TV'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../PluginChartMesTop3List'),
      metadata,
      transformProps,
    });
  }
}
