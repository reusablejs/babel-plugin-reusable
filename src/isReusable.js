const VALID_TOP_LEVEL_IMPORT_PATHS = [
  'reusable',
  'reusable/macro'
]

export const isValidTopLevelImport = x =>
  VALID_TOP_LEVEL_IMPORT_PATHS.includes(x)


export const isReusable = t => (path, state) => {

}
