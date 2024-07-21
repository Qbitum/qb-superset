import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class PluginChartMESVerticalNumbers extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      description: 'this is a test plugin for tv dashboard',
      name: t('MES Vertical Numbers'),
      exampleGallery: [{ url: thumbnail, caption: t('Vertical Numbers') }],
      category: t('MES-TV'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../PluginChartMESVerticalNumbers'),
      metadata,
      transformProps,
    });
  }
}
