import React from 'react';
import { t } from '@superset-ui/core';

import { HEADER_TYPE_TV } from '../../../util/componentTypes';
import { NEW_ROW_ID } from '../../../util/constants';
import DraggableNewComponent from '../new/DraggableNewComponent';

export default function DraggableNewFSHeader() {
  return (
    <DraggableNewComponent
      id={NEW_ROW_ID}
      type={HEADER_TYPE_TV}
      label={t('TV Header')}
      className="fa fa-long-arrow-right"
      childClass="mes-tv-header"
    />
  );
}
