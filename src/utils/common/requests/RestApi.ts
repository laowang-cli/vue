import { requests } from "@/utils/common/requests/requests"

type ListQueryField = {
  keyword?: string // keyword=name:wang
  fields?: string // age,name
  asc?: string // age,name
  desc?: string
  limit?: string // 30
}

type PageQueryField = {
  pageSize?: number
  currentPage?: number
}

export class RestApi<T> {
  resourceName = ""
  constructor(resourceName) {
    this.resourceName = resourceName
  }

  getById(id: number | string) {
    return requests.get<Ret<T>>(`/${this.resourceName}/${id}`)
  }

  getOne(model: T) {
    return requests.get<Ret<T>>(`/${this.resourceName}/getOne`, model)
  }

  getList(model: T & ListQueryField) {
    return requests.get<Ret<T[]>>(`/${this.resourceName}/getList`, model)
  }

  getPage(model: T & PageQueryField & ListQueryField) {
    return requests.get<Ret<Page<T>>>(`/${this.resourceName}/getPage`, model)
  }

  updateById(model: T) {
    return requests.put<Ret<boolean>>(`/${this.resourceName}`, model)
  }

  updateBatchById(models: T[]) {
    return requests.put<Ret<boolean>>(`/${this.resourceName}/batch`, models)
  }

  saveOrUpdate(model: T) {
    return requests.post<Ret<T>>(`/${this.resourceName}`, model)
  }

  saveOrUpdateBatch(models: T[]) {
    return requests.post<Ret<T>>(`/${this.resourceName}/batch`, models)
  }

  deleteById(id: number | string) {
    return requests.delete<Ret<boolean>>(`/${this.resourceName}/${id}`)
  }
}
