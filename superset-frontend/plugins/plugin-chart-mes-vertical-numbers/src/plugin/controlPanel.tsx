import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelsContainerProps,
  getStandardizedControls,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
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
        ['groupby'],
        ['metrics'],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            override: {
              default: 3,
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                !controls?.server_pagination?.value,
            },
          },
        ],
      ],
    },
    {
      label: t('Display settings'),
      expanded: true,
      tabOverride: 'data',
      controlSetRows: [
        [
          {
            name: 'noOfColumns',
            config: {
              type: 'TextControl',
              label: t('No Of Columns'),
              renderTrigger: true,
              description: t('No Of Columns'),
              default: 0,
            },
          },
        ],
        [
          {
            name: 'subtitle',
            config: {
              type: 'TextControl',
              label: t('Sub Title'),
              renderTrigger: true,
              description: t(
                'Description text that shows up below your Numbers',
              ),
            },
          },
        ],
        [
          {
            name: 'header',
            config: {
              type: 'TextControl',
              label: t('Header'),
              renderTrigger: true,
              description: t('Description text that display header'),
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
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 0.2,
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
              // default: 'black',
              choices: [
                // ['#000000', 'Black'],
                ['#FFFFFF', 'White'],
                ['#a9a9a9', 'Gray'],
                ['#DE3163', 'Bright Pink'],
                ['#a0b1e3', 'Dark Gray'],
                // ['orange', 'Orange'],
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
