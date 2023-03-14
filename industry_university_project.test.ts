import _ from "lodash"
import {
  CoorperationUnitEntity,
  RegionEntity,
  byRegion,
  byBusinessArea,
  BusinessAreaEntity,
  byEnterprise,
  byCollege
} from './industry_university_project'

import testData from './database/industry_university_project.json'

describe('Recipe routes', () => {
    it('byRegion', async () => {
        let exp: Array<RegionEntity> = [
          { region: '德清', total_amount: 60.6, colleges_count: 1, enterprises_count: 1 },
          { region: '宁波', total_amount: 41.6, colleges_count: 0, enterprises_count: 1 },
          { region: '上海', total_amount: 78, colleges_count: 1, enterprises_count: 0 }
        ]
        expect(byRegion(testData)).toEqual(exp);
    })

    it('byBusinessArea', async () => {
      let exp: Array<BusinessAreaEntity> = [
        { name: "信息技术", total: 3},
        { name: "人工智能", total: 1},
        { name: "大数据", total: 2},
        { name: "软件科技", total: 2},
        ]
      expect(byBusinessArea(testData)).toEqual(exp);
    })

    it('byCollege', async () => {
      let exp: Array<CoorperationUnitEntity> = [
        { id: 1, name: "大学1", total: 1, amount: 50.4},
        { id: 2, name: "大学2", total: 1, amount: 78},
        ]
      expect(byCollege(testData)).toEqual(exp);
    })

    it('byEnterprise', async () => {
      let exp: Array<CoorperationUnitEntity> = [
        { id: 1, name: "企业1", total: 2, amount: 41.6},
        { id: 2, name: "企业2", total: 1, amount: 10.2}
        ]
      expect(byEnterprise(testData)).toEqual(exp);
    })
})