// 字符串类型的数组
export type AdjoinType = Array<string>

export default class AdjoinMartix {
  vertex: AdjoinType
  quantity: number
  adjoinArray: Array<number>

  constructor(vertx: AdjoinType) {
    this.vertex = vertx
    this.quantity = this.vertex.length
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

  getVertexCol(id: string): Array<number> {
    const index = this.vertex.indexOf(id)
    const col: Array<number> = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

  getColSum(params: AdjoinType): Array<number> {
    const paramsVertex = params.map((id) => this.getVertexCol(id))
    const paramsVertexSum: Array<number> = []
    this.vertex.forEach((item, index) => {
      const rowtotal = paramsVertex
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0
          return total
        }, 0)
      paramsVertexSum.push(rowtotal)
    })
    return paramsVertexSum
  }

  // 获取交集
  getCollection(params: AdjoinType): AdjoinType {
    const paramsColSum = this.getColSum(params)
    let collections: AdjoinType = []
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) collections.push(this.vertex[index])
    })
    return collections
  }

  // 获取并集
  getUnions(params: AdjoinType): AdjoinType {
    const paramsColSum = this.getColSum(params)
    let unions: AdjoinType = []
    paramsColSum.forEach((item, index) => {
      if (item >= params.length && this.vertex[index])
        unions.push(this.vertex[index])
    })
    return unions
  }
}
