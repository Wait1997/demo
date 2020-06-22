import AdjoinMatrix from './adjoin-martix'
import { AdjoinType } from './adjoin-martix'

import {
  SpecCategoryType,
  CommoditySpecsType,
} from '../store/reducer/spec-reducer'

export default class SpecAdjoinMatrix extends AdjoinMatrix {
  specList: Array<CommoditySpecsType>
  specCombinationList: Array<SpecCategoryType>

  constructor(
    specList: Array<CommoditySpecsType>,
    specCombinationList: Array<SpecCategoryType>
  ) {
    super(
      specList.reduce(
        (total: AdjoinType, current) => [...total, ...current.list],
        []
      )
    )
    this.specList = specList
    this.specCombinationList = specCombinationList
    // 根据可选规格列表矩阵创建
    this.initSpec()
    // 同级顶点创建
    this.initSameLevel()
  }

  initSpec() {
    this.specCombinationList.forEach((item) => {
      this.fillInSpec(item.specs)
    })
  }

  initSameLevel() {
    // 获得初始所有可选项
    const specsOption = this.getCollection(this.vertex)
    this.specList.forEach((item) => {
      const params: AdjoinType = []
      // 获取同级别顶点
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value)
      })
      // 同级点位创建
      this.fillInSpec(params)
    })
  }

  getSpecscOptions(params: AdjoinType) {
    let specOptionCanchoose: AdjoinType = []
    if (params.some(Boolean)) {
      // 获取可选项（交集）
      specOptionCanchoose = this.getUnions(params.filter(Boolean))
    } else {
      // 所有可选项
      specOptionCanchoose = this.getCollection(this.vertex)
    }
    return specOptionCanchoose
  }

  fillInSpec(params: AdjoinType) {
    params.forEach((param) => {
      console.log(param)
      this.setAdjoinVertexs(param, params)
    })
  }
}
