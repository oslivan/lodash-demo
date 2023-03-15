// 纬度
// 按区域 region
// 按获奖对象 winner_type = Enterprise/College/User
// 按项目领域 business_areas = []
import * as _ from 'lodash';

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

function byRegion(data: Array<Data>): Array<RegionEntity> {
  return _.chain(data).groupBy("region").map((arr, region) => ({
    region: region,
    amount: _.sumBy(arr, "amount"),
    total: _.size(arr),
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

function byWinnerEntity(data: Array<Data>): Array<WinnerEntity> {
  return _.chain(data).groupBy(obj => obj.winner.name).map((arr, name) => ({
    name: name,
    amount: _.sumBy(arr, "amount"),
    provinceTotal: _.chain(arr).filter(obj => obj.category == "省级奖励").size().value(),
    cityTotal: _.chain(arr).filter(obj => obj.category == "市级奖励").size().value()
  })).value()
}