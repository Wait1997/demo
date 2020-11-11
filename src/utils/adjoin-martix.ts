// 字符串类型的数组
export type AdjoinType = Array<string>

export default class AdjoinMartix {
  vertex: AdjoinType
  quantity: number
  adjoinArray: Array<number>

  constructor(vertx: AdjoinType) {
    this.vertex = vertx // ['红色', '紫色', '白色', '黑色', '套餐一', '套餐二', '套餐三', '套餐四', '64G', '128G', '256G']
    this.quantity = this.vertex.length // 11
    this.adjoinArray = []
    this.init()
  }

  init(): void {
    this.adjoinArray = Array(this.quantity * this.quantity).fill(0)
  }

  setAdjoinVertexs(id: string, sides: AdjoinType): void {
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item)
      this.adjoinArray[pIndex * this.quantity + index] = 1
    })
  }

  // 获取矩阵一列的数据
  getVertexCol(id: string): Array<number> {
    const index = this.vertex.indexOf(id)
    const col: Array<number> = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

  getColSum(params: AdjoinType): Array<number> {
    // paramsVertex所有列的col集合(数组嵌套数组：子数组是每个列的集合)
    const paramsVertex = params.map((id) => this.getVertexCol(id))

    // console.log(paramsVertex)

    // paramsVertexSum为每一列和的集合
    const paramsVertexSum: Array<number> = []
    this.vertex.forEach((item, index) => {
      const rowtotal: number = paramsVertex
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0
          return total
        }, 0)
      paramsVertexSum.push(rowtotal)
    })
    return paramsVertexSum
  }

  // 传入一个顶点数组，求出并集
  getCollection(params: AdjoinType): AdjoinType {
    const paramsColSum = this.getColSum(params)
    // console.log(paramsColSum)
    let collections: AdjoinType = []
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) collections.push(this.vertex[index])
    })
    // 筛选出所有可以选的规格的商品
    return collections
  }

  // 传入一个顶点数组，求出交集
  getUnions(params: AdjoinType): AdjoinType {
    const paramsColSum = this.getColSum(params)
    // console.log(paramsColSum)
    let unions: AdjoinType = []
    paramsColSum.forEach((item, index) => {
      if (item >= params.length && this.vertex[index])
        unions.push(this.vertex[index])
    })
    // console.log(unions)
    return unions
  }
}
