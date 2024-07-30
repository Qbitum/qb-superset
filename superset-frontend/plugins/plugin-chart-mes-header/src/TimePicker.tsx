import { styled } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';

const TimeBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.transparentbg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 16px;
  min-height: 60px;
  max-height: 60px;
  align-items: center;
  display: flex;
`;
function TimePicker() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (
    <TimeBadgeStyled>
      {time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
      })}
    </TimeBadgeStyled>
  );
}

export default TimePicker;
