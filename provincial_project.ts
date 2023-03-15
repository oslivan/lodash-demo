// 纬度
// 按区域 region
// 按完成单位 complete_unit_type = College/Enterprise
// 按项目领域 business_areas = []

export interface Data {
  id:                 number;
  name:               string;
  serial_no:          string;
  areas:              string;
  category:           string;
  goal:               string;
  budget:             string;
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
  amount: number;
  total: number;
  complete_units_count: number;
}

// 单位名
// 项目总金额
// 项目数量
export interface CompleteUnitEntity {
  name: string;
  amount: number;
  total: nu
}