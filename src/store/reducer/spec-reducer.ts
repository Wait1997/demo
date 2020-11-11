export const TOGGLE = 'spec'

// typeof操作符可以获取一个变量或对象的类型
export type CommoditySpecsType = {
  title: string
  list: Array<string>
}

export type SpecCategoryType = {
  id: string
  specs: Array<string>
}

export type SpecStateType = {
  specList: Array<CommoditySpecsType>
  specCombinationList: Array<SpecCategoryType>
}

const initialState: SpecStateType = {
  // 商品的类型
  specList: [
    { title: '颜色', list: ['红色', '紫色', '白色', '黑色'] },
    { title: '套餐', list: ['套餐一', '套餐二', '套餐三', '套餐四'] },
    { title: '内存', list: ['64G', '128G', '256G'] },
  ],
  // 可选规格的商品
  specCombinationList: [
    { id: '1', specs: ['紫色', '套餐一', '64G'] },
    { id: '2', specs: ['紫色', '套餐一', '128G'] },
    { id: '3', specs: ['紫色', '套餐二', '128G'] },
    { id: '4', specs: ['黑色', '套餐三', '256G'] },
  ],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE: {
      return {
        ...state,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
