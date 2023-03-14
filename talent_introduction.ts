// 纬度
// 按区域 region
// 按企业 enterprise = Enterprise
// 按项目领域 business_areas = []

import _ from "lodash"
import { byBusinessArea, BusinessAreaEntity } from './industry_university_project'
export { byBusinessArea, BusinessAreaEntity }

export interface Data {
  id:         number;
  year:       number;
  total:      number;
  region:     string;
  business_areas: Array<string>,
  enterprise: {
    id:   number;
    name: string;
  };
}

export interface RegionEntity {
  region: string;
  total: number;
  enterprises_count: number;
}

export function byRegion(data: Array<Data>): Array<RegionEntity> {
  return _.chain(data).groupBy("region").map((arr, region) => ({
      region: region,
      total: _.chain(arr).sumBy("total").value(),
      enterprises_count: _.chain(arr).map(obj => obj.enterprise.id).uniq().size().value(),
    })).value()
}

export interface EnterpriseEntity {
  id: number;
  name: string;
  total: number;
}

export function byEnterprise(data: Array<Data>): Array<EnterpriseEntity> {
  return _.chain(data).groupBy(obj => obj.enterprise.id).map(arr => ({
    id: arr[0].enterprise.id,
    name: arr[0].enterprise.name,
    total: _.sumBy(arr, "total")
  })).value()
}
