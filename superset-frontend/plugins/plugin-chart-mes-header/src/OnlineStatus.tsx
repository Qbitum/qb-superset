import React, { useEffect, useState } from 'react';
import { MdOutlineWifiOff, MdWifi } from 'react-icons/md';
import { styled } from '@superset-ui/core';

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
  padding: 16px 20px;
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
          <MdWifi />
          online
        </OnlineBadgeStyled>
      ) : (
        <OfflineBadgeStyled>
          <MdOutlineWifiOff />
          offline
        </OfflineBadgeStyled>
      )}
    </div>
  );
}

export default OnlineStatus;
