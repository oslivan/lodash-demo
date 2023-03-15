// 纬度
// 按区域 region
// 按获奖对象 winner_type = Enterprise/College/User
// 按项目领域 business_areas = []
import _ from "lodash"
import { byBusinessArea, BusinessAreaEntity, calcSum } from './industry_university_project'
export { byBusinessArea, BusinessAreaEntity }

export interface Data {
  id:             number;
  name:           string;
  category:       string;
  awarding_at:    string;
  amount:         number;
  reason:         string;
  recommend_unit: string;
  region:         string;
  occurred_at:    string;
  business_areas: Array<string>;
  winner_type:    string;
  winner:         {
    id:   number;
    name: string;
  };
  technology:     {
    id:   number;
    name: string;
  };
  [propName: string]: any;
}

// 奖励金额
// 奖励数量
// 市级奖励数
// 省级奖励数
// 获奖实体数
export interface RegionEntity {
  region: string;
  amount: number;
  total: number;
  cityTotal: number;
  provinceTotal: number;
  winnerTotal: number;
}

export function byRegion(data: Array<Data>): Array<RegionEntity> {
  return _.chain(data).groupBy("region").map((arr, region) => ({
    region: region,
    amount: calcSum(arr, "amount"),
    total: arr.length,
    cityTotal: _.chain(arr).filter(obj => obj.category == "市级奖励").size().value(),
    provinceTotal: _.chain(arr).filter(obj => obj.category == "省级奖励").size().value(),
    winnerTotal: _.chain(arr).map(obj => `${obj.winner_type}:${obj.winner.id}`).uniq().size().value()
  })).value();
}

// 机构名
// 奖励总金额
// 省级奖励数量
// 市级奖励数量
export interface WinnerEntity {
  name: string;
  amount: number;
  provinceTotal: number;
  cityTotal: number;
}

// 按获奖对象搞
export function byWinnerEntity(data: Array<Data>): Array<WinnerEntity> {
  return _.chain(data)
          .groupBy(obj => `${obj.winner_type}:${obj.winner.id}`)
          .map((arr) => ({
            name: arr[0].winner.name,
            amount: calcSum(arr, "amount"),
            provinceTotal: _.chain(arr).filter(obj => obj.category == "省级奖励").size().value(),
            cityTotal: _.chain(arr).filter(obj => obj.category == "市级奖励").size().value()
          })).value()
}