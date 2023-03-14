import _ from "lodash"
import {
  byRegion,
  RegionEntity,
  byBusinessArea,
  BusinessAreaEntity,
  byEnterprise,
  EnterpriseEntity
} from './talent_introduction'

import testData from './database/talent_introduction.json'

describe('Recipe routes', () => {
    it('byRegion', async () => {
      let exp: Array<RegionEntity> = [
        { region: "德清",total: 444, enterprises_count: 1 },
        { region: "宁波",total: 213, enterprises_count: 1 },
        { region: "上海",total: 12, enterprises_count: 1 },
      ]
      expect(byRegion(testData)).toEqual(exp)
    })

    it('byBusinessArea', async () => {
      let exp: Array<BusinessAreaEntity> = [
        { name: "信息技术", total: 3},
        { name: "人工智能", total: 1},
        { name: "大数据", total: 2},
        { name: "软件科技", total: 2},
        ]
      expect(byBusinessArea(testData)).toEqual(exp)
    })

    it('byEnterprise', async () => {
      let exp: Array<EnterpriseEntity> = [
        { id: 1, name: "企业1", total: 444},
        { id: 2, name: "企业2", total: 213},
        { id: 3, name: "企业3", total: 12}
      ]
      expect(byEnterprise(testData)).toEqual(exp)
    })
})