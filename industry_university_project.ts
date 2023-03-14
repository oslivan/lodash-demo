// 纬度
// 按区域 region
// 按高校 cooperation_unit_type = College
// 按企业 cooperation_unit_type = Enterprise
// 按项目领域 business_areas = []
//
// {
//   "region": "",
//   "total_amount": 11,
//   "colleges_count": 1,
//   "enterprises_count": 2
// }

import * as _ from 'lodash';

// 数据结构
export interface Data {
  id:                    number;
  region:                string;
  amount:                number;
  business_areas:        Array<string>;
  cooperation_unit_type: string;
  cooperation_unit:      {
    id:   number;
    name: string;
  };
  [propName: string]: any;
}

enum Unit {
  College    = "College",
  Enterprise = "Enterprise"
}

// 区域实体
export interface RegionEntity {
  region: string;
  total_amount: number;
  colleges_count: number;
  enterprises_count: number;
}

// 按区域分割数据
export function byRegion(data: Array<Data>): Array<RegionEntity> {
  let gKey = "region";
  return _.chain(data)
          .groupBy(gKey)
          .map((v, k) => ({
            region: k,
            total_amount: calcSum(v, "amount"),
            colleges_count: calcUnitCnt(v, Unit.College),
            enterprises_count: calcUnitCnt(v, Unit.Enterprise)
          })).value()
}

// 领域实体
export interface BusinessAreaEntity {
  name: string;
  total: number;
}

// 按领域分割数据
export function byBusinessArea(data: Array<{business_areas: string[]}>): Array<BusinessAreaEntity> {
  let gKey = "business_areas";
  return _.chain(data).map(gKey).flatten().groupBy()
          .map((arr, name) => ({
            name: name,
            total: arr.length
          })).value()
}

// 机构/企业实体
export interface CoorperationUnitEntity {
  id: number;
  name: string;
  total: number;
  amount: number;
}

// 按机构分割数据
// 筛选出所有 cooperation_unit_type 为 College 的数据
// 按照 college id 为分组依据进行分组
// 合并 college.id 相同的数据，并计算出 college 的的统计结果
export function byCollege(data: Array<Data>): Array<CoorperationUnitEntity> {
  return _.chain(data)
          .filter(obj => Unit.College == obj.cooperation_unit_type)
          .groupBy(obj => obj.cooperation_unit.id)
          .map((arr, id) => ({
              id: _.toInteger(id),
              name: arr[0].cooperation_unit.name,
              total: _.size(arr),
              amount: calcSum(arr, "amount")
          })).value()
}

// 按企业分割数据
export function byEnterprise(data: Array<Data>): Array<CoorperationUnitEntity> {
  return _.chain(data)
          .filter(obj => Unit.Enterprise == obj.cooperation_unit_type)
          .groupBy(obj => obj.cooperation_unit.id)
          .map((arr, id) => ({
            id: _.toInteger(id),
            name: arr[0].cooperation_unit.name,
            total: _.size(arr),
            amount: calcSum(arr, "amount")
          })).value()
}

function calcUnitCnt(data: Array<Data>, unitType: string): number {
  return _.chain(data)
          .filter(o => unitType == o.cooperation_unit_type)
          .map(o => o.cooperation_unit.id)
          .uniq().size().value();
}

// 保留两位小数
function calcSum(data: Array<Data>, key: string): number {
  return _.chain(data).sumBy(key).round(2).value();
}
