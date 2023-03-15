// 纬度
// 按区域 region
// 按投资对象 object_type = Enterprise/College/User

import _ from "lodash"
import { byBusinessArea, BusinessAreaEntity, calcSum } from './industry_university_project'
export { byBusinessArea, BusinessAreaEntity }

export interface Data {
  id:             number;
  name:           string;
  region:         string;
  amount:         string;
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
  region: string;
  amount: number;
  total: number;
  objectsCount: number;
}

// 按区域分割
export function byRegion(data: Array<Data>): Array<RegionEntity> {
  return _.chain(data).groupBy("region").map((arr, region) => ({
    region: region,
    amount: calcSum(arr, "amount"),
    total: arr.length,
    objectsCount: _.chain(arr).map(obj => `${obj.object_type}:${obj.object.id}`).uniq().size().value()
  })).value();
}

// 机构名
// 机构类型
// 项目金额
// 项目数量
export interface ObjectEntity {
  name: string;
  amount: number;
  total: number;
}

// 按投资对象分割
export function byObject(data: Array<Data>): Array<ObjectEntity> {
  return _.chain(data)
   .groupBy(obj => `${obj.object_type}:${obj.object.id}`)
   .map((arr) => ({
     name: arr[0].object.name,
     amount: calcSum(arr, "amount"),
     total: arr.length
   })).value()
}