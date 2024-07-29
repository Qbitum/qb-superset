import React, { useEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
import { nowifiBase64, wifiBase64 } from './images/base64';

const OnlineBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.greenbg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  padding: 16px 20px;
  min-height: 60px;
`;

const OfflineBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.redbg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  padding: 16px 16px;
  min-height: 60px;
`;

function OnlineStatus() {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    function handleOnlineState() {
      setOnline(true);
    }

    function handleOfflineState() {
      setOnline(false);
    }

    window.addEventListener('online', handleOnlineState);
    window.addEventListener('offline', handleOfflineState);
    return () => {
      window.removeEventListener('online', handleOnlineState);
      window.removeEventListener('offline', handleOfflineState);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <OnlineBadgeStyled>
          <img
            src={wifiBase64}
            alt="Online"
            style={{ marginRight: '8px', width: '24px', height: '24px' }}
          />
          online
        </OnlineBadgeStyled>
      ) : (
        <OfflineBadgeStyled>
          <img
            src={nowifiBase64}
            alt="Offline"
            style={{ marginRight: '8px', width: '24px', height: '24px' }}
          />
          offline
        </OfflineBadgeStyled>
      )}
    </div>
  );
}

export default OnlineStatus;
