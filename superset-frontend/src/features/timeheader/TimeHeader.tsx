import { Button, PageHeader } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import React, { FC } from 'react';
import { RangePicker } from 'src/components/DatePicker';

interface TimeHeaderProps {
  title?: string;
}
export default function TimeHeader({ title }: TimeHeaderProps) {
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'Production',
    },
    {
      path: 'first',
      breadcrumbName: 'Factory 1',
    },
  ];

  const DatePicker: FC<any> = () => {
    const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
      if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      } else {
        console.log('Clear');
      }
    };
    return (
      <>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={onChange}
        />
      </>
    );
  };

  const lastUpdatedTime = new Date().toString();
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        breadcrumb={{ routes }}
        title="Factory 1"
        subTitle={`Last updated on ${lastUpdatedTime}`}
        extra={[
          <DatePicker />,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      />
    </div>
  );
}
