import { formatSelectOptions } from '@superset-ui/chart-controls';
import { addLocaleData, t } from '@superset-ui/core';
import i18n from './i18n';

addLocaleData(i18n);

export const PAGE_SIZE_OPTIONS = formatSelectOptions<number>([
  [0, t('page_size.all')],
  5,
  10,
]);
