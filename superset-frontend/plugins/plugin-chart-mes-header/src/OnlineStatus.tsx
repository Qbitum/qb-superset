import React, { useEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
import { nowifiBase64, wifiBase64 } from './images/base64';

const OnlineBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.greenbg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  font-size: 12px;
  padding: 8px;
`;

const OfflineBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.redbg};
  color: ${({ theme }) => theme.tvDb.fontColor.black};
  border-radius: 8px;
  padding: 8px;
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
            style={{ width: '24px', height: '24px' }}
          />
        </OnlineBadgeStyled>
      ) : (
        <OfflineBadgeStyled>
          <img
            src={nowifiBase64}
            alt="Offline"
            style={{ width: '24px', height: '24px' }}
          />
        </OfflineBadgeStyled>
      )}
    </div>
  );
}

export default OnlineStatus;
