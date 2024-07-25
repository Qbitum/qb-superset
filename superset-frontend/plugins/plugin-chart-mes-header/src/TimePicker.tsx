import { styled } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';

const TimeBadgeStyled = styled.div`
  background-color: ${({ theme }) => theme.tvDb.headerColors.transparentbg};
  color: ${({ theme }) => theme.tvDb.fontColor.white};
  border-radius: 8px;
  padding: 16px 20px;
  min-height: 60px;
  align-items: center;
`;
function TimePicker() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  console.log('this is header time', time);

  return (
    <TimeBadgeStyled>
      {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
    </TimeBadgeStyled>
  );
}

export default TimePicker;
