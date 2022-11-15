const isDev = process.env.NODE_ENV === "development"

export const _import = (module) => {
  console.log("module", module)
  return isDev ? () => import(module) : require(module)
}
