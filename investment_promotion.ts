// 纬度
// 按区域 region
// 按投资对象 object_type = Enterprise/College/User

import _ from "lodash"
import { byBusinessArea, BusinessAreaEntity } from './industry_university_project'
export { byBusinessArea, BusinessAreaEntity }

export interface Data {
  id:             number;
  name:           string;
  region:         string;
  occurred_at:    string;
  business_areas: Array<string>;
  object_type:    string;
  object: {
    id:   number;
    name: string;
  };
  [propName: string]: any;
}

// 招商引资金额
// 招商引资项目数量
// 招商对象数量
export interface RegionEntity {
  amount: number;
  total: number;
  objectsCount: number;
}

// 机构名
// 项目金额
// 项目数量
export interface ObjectEntity {
  name: string;
  amount: number;
  total: number;
}