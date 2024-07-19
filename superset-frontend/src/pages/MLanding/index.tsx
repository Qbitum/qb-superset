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
import React, { useState } from 'react';
import {
  isFeatureEnabled,
  FeatureFlag,
  JsonObject,
  styled,
  t,
} from '@superset-ui/core';
import { User } from 'src/types/bootstrapTypes';
import {
  dangerouslyGetItemDoNotUse,
  dangerouslySetItemDoNotUse,
} from 'src/utils/localStorageHelpers';
import ListViewCard from 'src/components/ListViewCard';
import withToasts from 'src/components/MessageToasts/withToasts';
import { CardContainer, loadingCardCount } from 'src/views/CRUD/utils';
import { AntdSwitch } from 'src/components';
import getBootstrapData from 'src/utils/getBootstrapData';
import { TableTab } from 'src/views/CRUD/types';
import { SubMenuProps } from 'src/features/home/SubMenu';
import { Content, Footer } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import TimeHeader from 'src/features/timeheader/TimeHeader';
import {
  BarChartOutlined,
  FileSearchOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { Layout, Menu } from 'antd';

interface WelcomeProps {
  user: User;
  addDangerToast: (arg0: string) => void;
}

export interface ActivityData {
  [TableTab.Created]?: JsonObject[];
  [TableTab.Edited]?: JsonObject[];
  [TableTab.Viewed]?: JsonObject[];
  [TableTab.Other]?: JsonObject[];
}

interface LoadingProps {
  cover?: boolean;
}

const WelcomeNav = styled.div`
  ${({ theme }) => `
    .switch {
      display: flex;
      flex-direction: row;
      margin: ${theme.gridUnit * 4}px;
      span {
        display: block;
        margin: ${theme.gridUnit}px;
        line-height: ${theme.gridUnit * 3.5}px;
      }
    }
  `}
`;

const LogoContainer = styled.div`
  text-align: left;
  padding: 0 8px;
  ${({ theme }) => `
.menu-brand {
        min-height: 50px;
        padding: ${theme.gridUnit}px
          ${theme.gridUnit * 2}px
          ${theme.gridUnit}px
          ${theme.gridUnit * 4}px;
        max-width: ${theme.gridUnit * theme.brandIconMaxWidth}px;
        img {
          height: 100%;
          object-fit: contain;
        }
      }
        `}
`;

const bootstrapData = getBootstrapData();

export const LoadingCards = ({ cover }: LoadingProps) => (
  <CardContainer showThumbnails={cover} className="loading-cards">
    {[...new Array(loadingCardCount)].map((_, index) => (
      <ListViewCard
        key={index}
        cover={cover ? false : <></>}
        description=""
        loading
      />
    ))}
  </CardContainer>
);

function Landing({ user }: WelcomeProps) {
  const userid = user.userId;
  const id = userid!.toString(); // confident that user is not a guest user
  // const params = rison.encode({ page_size: 6 });
  // const recent = `/api/v1/log/recent_activity/?q=${params}`;
  const userKey = dangerouslyGetItemDoNotUse(id, null);
  let defaultChecked = false;
  const isThumbnailsEnabled = isFeatureEnabled(FeatureFlag.Thumbnails);
  if (isThumbnailsEnabled) {
    defaultChecked =
      userKey?.thumbnails === undefined ? true : userKey?.thumbnails;
  }
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    setChecked(!checked);
    dangerouslySetItemDoNotUse(id, { thumbnails: !checked });
  };

  const menuData: SubMenuProps = {
    activeChild: 'Landing',
    name: t('Landing'),
  };

  if (isThumbnailsEnabled) {
    menuData.buttons = [
      {
        name: (
          <WelcomeNav>
            <div className="switch">
              <AntdSwitch checked={checked} onClick={handleToggle} />
              <span>{t('Thumbnails')}</span>
            </div>
          </WelcomeNav>
        ),
        onClick: handleToggle,
        buttonStyle: 'link',
      },
    ];
  }

  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
          flexDirection: 'row',
        }}
      >
        <Sider collapsible collapsed={false}>
          <LogoContainer>
            <img
              className="menu-brand"
              src={bootstrapData.common.menu_data.brand.icon}
              alt={bootstrapData.common.menu_data.brand.alt}
            />
            <Title level={5} type="warning">
              Operation Inteligance
            </Title>
          </LogoContainer>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item isSelected icon={<BarChartOutlined />} key={1}>
              Operations
            </Menu.Item>
            <Menu.Item icon={<OrderedListOutlined />}>Order</Menu.Item>
            <Menu.Item icon={<FileSearchOutlined />}>Reports</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <TimeHeader />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2024 Created by Qbitum
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default withToasts(Landing);
