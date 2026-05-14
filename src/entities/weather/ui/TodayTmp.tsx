import type { TodayTmpType } from '../model/types';
import { Card } from '../../../shared';
export const TodayTmp = ({ type, minTmp, maxTmp }: TodayTmpType) => {
  return (
    <Card width="tempStatItem">
      <p>{type === 'min' ? '최저' : '최고'}</p>
      <p>{maxTmp ? maxTmp : minTmp}°</p>
    </Card>
  );
};
