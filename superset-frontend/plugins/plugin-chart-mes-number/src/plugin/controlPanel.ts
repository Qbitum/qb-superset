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
      label: t('Display subheader'),
      expanded: true,
      tabOverride: 'data',
      controlSetRows: [
        [
          {
            name: 'subheader',
            config: {
              type: 'TextControl',
              label: t('Subheader'),
              renderTrigger: true,
              description: t(
                'Description text that shows up above your Big Number',
              ),
            },
          },
        ],
      ],
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
            name: 'subheader_font_size',
            config: {
              type: 'SelectControl',
              label: t('Subheader Font Size'),
              default: 0.1,
              choices: [
                // [value, label]
                [0.1, 'xx-small'],
                [0.2, 'x-small'],
                [0.3, 'small'],
                [0.4, 'medium'],
                [0.5, 'large'],
                [0.6, 'x-large'],
                [0.8, 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your header font'),
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
