import { ensureIsArray, t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sharedControls,
  getStandardizedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Hello Controls!'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Header Text'),
              description: t('The text you want to see in the header'),
            },
          },
        ],
        [
          {
            name: 'bold_text',
            config: {
              type: 'CheckboxControl',
              label: t('Bold Text'),
              renderTrigger: true,
              default: true,
              description: t('A checkbox to make the '),
            },
          },
        ],
      ],
    },
  ],
  formDataOverrides: formData => {
    const groupbyColumns = getStandardizedControls().controls.columns.filter(
      col => !ensureIsArray(formData.groupbyRows).includes(col),
    );
    getStandardizedControls().controls.columns =
      getStandardizedControls().controls.columns.filter(
        col => !groupbyColumns.includes(col),
      );
    return {
      ...formData,
      metrics: getStandardizedControls().popAllMetrics(),
      groupbyColumns,
    };
  },
};

export default config;
