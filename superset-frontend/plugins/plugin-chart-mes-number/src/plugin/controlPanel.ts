import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  getStandardizedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['metric'], ['adhoc_filters']],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'number_font_size',
            config: {
              type: 'SelectControl',
              label: t('Number Font Size'),
              default: 0.4,
              choices: [
                // [value, label]
                [0.2, 'xx-small'],
                [0.4, 'x-small'],
                [0.6, 'small'],
                [0.7, 'medium'],
                [0.8, 'large'],
                [0.9, 'x-large'],
                [1.0, 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your number font'),
            },
          },
        ],

        [
          {
            name: 'font_color',
            config: {
              type: 'SelectControl',
              label: t('Font Color'),
              // default: 'white',
              choices: [
                ['#FFFFFF', 'White'],
                ['#FF11F1', 'Red'],
                ['green', 'Green'],
                ['blue', 'Blue'],
                ['yellow', 'Yellow'],
                ['orange', 'Orange'],
              ],
              renderTrigger: true,
              description: t('The color of your header font'),
            },
          },
        ],
      ],
    },
  ],
  formDataOverrides: formData => ({
    ...formData,
    metric: getStandardizedControls().shiftMetric(),
  }),
};

export default config;
