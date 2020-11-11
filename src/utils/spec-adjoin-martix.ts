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

  initSpec(): void {
    this.specCombinationList.forEach((item) => {
      this.fillInSpec(item.specs)
    })
  }

  initSameLevel(): void {
    // 获得初始所有可选项
    const specsOption = this.getCollection(this.vertex)
    // console.log(specsOption)
    this.specList.forEach((item) => {
      const params: AdjoinType = []
      // 获取同级别顶点
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value)
      })
      // console.log(params)
      // 同级点位创建
      this.fillInSpec(params) // ['紫色', '黑色']
    })
  }

  getSpecscOptions(params: AdjoinType): AdjoinType { // params: ['', '', '']
    let specOptionCanchoose: AdjoinType = []
    // console.log(params.some(Boolean)) // false
    if (params.some(Boolean)) {
      // 获取可选项（交集）
      specOptionCanchoose = this.getUnions(params.filter(Boolean))
    } else {
      // 所有可选项
      specOptionCanchoose = this.getCollection(this.vertex)
    }
    return specOptionCanchoose
  }

  fillInSpec(params: AdjoinType): void {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params)
    })
  }
}
