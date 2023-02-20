export interface BaseService<T>{
    create: (payload: any) => Promise<T>
    findAll: (pager: IPager) => Promise<[T]>
    find: (id:String) => Promise<T>
    update:(id:String, payload:any) => Promise<T>
    delete: (id:String) => void
}

export interface IPager {
    start?: number,
    limit?: number
  }