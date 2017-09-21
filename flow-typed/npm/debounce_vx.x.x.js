// flow-typed signature: 449928d84383c06b32b09e73e203e021
// flow-typed version: <<STUB>>/debounce_v1.0.2/flow_v0.54.1

declare module 'debounce' {
  declare function debounce<F: Function>(
    func: F,
    wait: number,
    immediate: ?boolean
  ): F

  declare module.exports: typeof debounce
}

// Filename aliases
declare module 'debounce/index' {
  declare module.exports: $Exports<'debounce'>
}
declare module 'debounce/index.js' {
  declare module.exports: $Exports<'debounce'>
}
