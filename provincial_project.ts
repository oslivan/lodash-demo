// 纬度
// 按区域 region
// 按完成单位 complete_unit_type = College/Enterprise
// 按项目领域 business_areas = []

import _ from "lodash"
import { byBusinessArea, BusinessAreaEntity, calcSum } from './industry_university_project'
export { byBusinessArea, BusinessAreaEntity }

export interface Data {
  id:                 number;
  name:               string;
  serial_no:          string;
  areas:              string;
  category:           string;
  goal:               string;
  budget:             number;
  cycle:              string;
  progress:           string;
  archivement:        string;
  state:              string;
  director_name:      string;
  director_mobile:    string;
  region:             string;
  occurred_at:        string;
  business_areas:     Array<string>;
  complete_unit:      {
      id:   number;
      name: string;
  };
  complete_unit_type: string;
  [propName: string]: any;
}

// 项目金额
// 项目数量
// 完成单位数
export interface RegionEntity {
  region: string;
  amount: number;
  total: number;
  complete_units_count: number;
}

// 按区域分割
export function byRegion(data: Array<Data>): Array<RegionEntity> {
  return _.chain(data).groupBy("region").map((arr, region) => ({
    region: region,
    amount: calcSum(arr, "budget"),
    total: arr.length,
    complete_units_count: _.chain(arr).map(obj => `${obj.object_type}:${obj.object.id}`).uniq().size().value()
  })).value();
}

// 单位名
// 项目总金额
// 项目数量
export interface CompleteUnitEntity {
  name: string;
  amount: number;
  total: number;
}

// 按完成单位分割
export function byCompleteUnit(data: Array<Data>): Array<CompleteUnitEntity> {
  return _.chain(data)
  .groupBy(obj => `${obj.complete_unit_type}:${obj.complete_unit.id}`)
  .map((arr) => ({
    name: arr[0].complete_unit.name,
    amount: calcSum(arr, "budget"),
    total: arr.length,
  })).value();
}