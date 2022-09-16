const listToTree = <T>(
  list: T[],
  options: {
    idField?: string
    refField?: string
    childrenField?: string
    beforeInsert?: (t: T) => void
    afterInsert?: (t: T) => void
    noParentStrategy?:
      | "attachRoot"
      | "pass"
      | "throw"
      | ((node: T, root: T[]) => void)
  } = {}
) => {
  const {
    idField = "id",
    refField = "parentId",
    childrenField = "children",
    beforeInsert,
    afterInsert,
    noParentStrategy = "pass"
  } = options
  const result: T[] = []
  list.forEach((node: any) => {
    beforeInsert && beforeInsert.call(node, node)
    if (!node[refField]) {
      // 没有指向父id -> 根目录节点
      result.push(node)
      afterInsert && afterInsert.call(node, node)
      return
    }
    const parent = list.find((i: any) => i[idField] === node[refField])
    if (parent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const children = parent[childrenField] || (parent[childrenField] = [])
      children.push(node)
      afterInsert && afterInsert.call(node, node)
    } else {
      if (noParentStrategy === "attachRoot") {
        result.push(node)
        afterInsert && afterInsert.call(node, node)
      } else if (noParentStrategy === "throw") {
        throw new Error("item parent not found")
      } else if (noParentStrategy === "pass") {
        // eslint-disable-next-line no-empty
      } else {
        noParentStrategy.call(node, node, result)
      }
    }
  })
  return result
}

const findRecursiveParent = <T> (
  item: any,
  list: T[],
  options: {
    idField?: string
    refField?: string
  } = {}
) => {
  const { idField = "id", refField = "parentId" } = options
  const ret: T[] = []
  let parent
  while (true) {
    const shouldContinue = item && item[refField]
    if (!shouldContinue) {
      break
    }
    parent = list.find((i) => i[idField] === item[refField])
    if (parent) {
      parent && ret.push(parent)
      item = parent
    } else {
      break
    }
  }
  return ret
}

export { listToTree, findRecursiveParent }
