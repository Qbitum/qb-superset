/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  getStandardizedControls,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (translated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an integer or decimal value
   */

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
        ['groupby'],
        ['metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Display settings'),
      expanded: true,
      tabOverride: 'data',
      controlSetRows: [
        [
          {
            name: 'subheader',
            config: {
              type: 'TextControl',
              label: t('Title'),
              renderTrigger: true,
              description: t(
                'Description text that shows up below your Big Number',
              ),
            },
          },
        ],
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
        // [
        //   {
        //     name: 'enteredValue',
        //     config: {
        //       type: 'TextControl',
        //       label: t('Value Array'),
        //       renderTrigger: true,
        //       description: t('Enter multiple sub values, one per line'),
        //       default: [],
        //     },
        //   },
        // ],
        [
          {
            name: 'subtitle',
            config: {
              type: 'TextControl',
              label: t('Sub Title'),
              renderTrigger: true,
              description: t(
                'Description text that shows up below your Big Number',
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
        // [
        //   {
        //     name: 'subheader_font_size',
        //     config: {
        //       type: 'SelectControl',
        //       label: t('Subheader Font Size'),
        //       default: 0.1,
        //       choices: [
        //         // [value, label]
        //         [0.1, 'xx-small'],
        //         [0.2, 'x-small'],
        //         [0.3, 'small'],
        //         [0.4, 'medium'],
        //         [0.5, 'large'],
        //         [0.6, 'x-large'],
        //         [0.8, 'xx-large'],
        //       ],
        //       renderTrigger: true,
        //       description: t('The size of your header font'),
        //     },
        //   },
        // ],
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
        // [
        //   {
        //     name: 'selected_symbol',
        //     config: {
        //       type: 'SelectControl',
        //       label: t('Symbol'),
        //       default: '',
        //       choices: [
        //         // [value, label]
        //         ['%', 'percentage'],
        //       ],
        //       renderTrigger: true,
        //       description: t('Select Symbol'),
        //     },
        //   },
        // ],

        // [
        //   {
        //     name: 'bold_text',
        //     config: {
        //       type: 'CheckboxControl',
        //       label: t('Bold Text'),
        //       renderTrigger: true,
        //       default: true,
        //       description: t('A checkbox to make the '),
        //     },
        //   },
        // ],
        // [
        //   {
        //     name: 'percentDifferenceFormat',
        //     config: {
        //       ...sharedControls.y_axis_format,
        //       label: t('Percent Difference format'),
        //     },
        //   },
        // ],

        // ['currency_format'],

        // [
        //   {
        //     name: 'row_limit',
        //     config: sharedControls.currency_format
        //   },
        // ],
        [
          {
            name: 'font_color',
            config: {
              type: 'SelectControl',
              label: t('Font Color'),
              // default: 'black',
              choices: [
                ['#000000', 'Black'],
                ['#FFFFFF', 'White'],
                ['#a9a9a9', 'Gray'],
                ['#DE3163', 'Bright Pink'],
                // ['yellow', 'Yellow'],
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
  // formDataOverrides: formData => {
  //   const groupbyColumns = getStandardizedControls().controls.columns.filter(
  //     col => !ensureIsArray(formData.groupbyRows).includes(col),
  //   );
  //   getStandardizedControls().controls.columns =
  //     getStandardizedControls().controls.columns.filter(
  //       col => !groupbyColumns.includes(col),
  //     );
  //   return {
  //     ...formData,
  //     metrics: getStandardizedControls().popAllMetrics(),
  //     groupbyColumns,
  //   };
  // },

  formDataOverrides: formData => ({
    ...formData,
    metric: getStandardizedControls().shiftMetric(),
  }),
};

export default config;
