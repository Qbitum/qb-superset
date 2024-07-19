import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class PluginChartMESNumber extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'this is a number display plugin for tv dashboard',
      name: t('MES Number'),
      exampleGallery: [{ url: thumbnail, caption: t('A Number') }],
      thumbnail,
      category: t('MES-TV'),
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../PluginChartMESNumber'),
      metadata,
      transformProps,
    });
  }
}
