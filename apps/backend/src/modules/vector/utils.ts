import { WeaviateFilter } from '@langchain/weaviate';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export function transformDateFilters(
  node: WeaviateFilter['where'],
  timezone: string,
): WeaviateFilter['where'] {
  if (node.path?.[0] === 'timestamp' && node.valueDate) {
    let date = dayjs.tz(node.valueDate, timezone);

    // LessThanEqual 연산자의 경우 1일을 더합니다
    if (node.operator === 'LessThanEqual') {
      date = date.add(1, 'day');
    }

    const unixTime = date.unix();
    delete node.valueDate;
    node.valueNumber = unixTime;
  }

  // 재귀적으로 하위 operands 처리
  if (node.operands && Array.isArray(node.operands)) {
    node.operands = node.operands.map((child) =>
      transformDateFilters(child, timezone),
    );
  }

  return node;
}