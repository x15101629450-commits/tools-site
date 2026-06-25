export function toCamelCase(s) {
  return s
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toLowerCase())
}

export function toPascalCase(s) {
  const c = toCamelCase(s)
  return c.charAt(0).toUpperCase() + c.slice(1)
}

export function toSnakeCase(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

export function toKebabCase(s) {
  return toSnakeCase(s).replace(/_/g, '-')
}

export function toConstantCase(s) {
  return toSnakeCase(s).toUpperCase()
}

export function toTitleCase(s) {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

export function toUpperCase(s) {
  return s.toUpperCase()
}

export function toLowerCase(s) {
  return s.toLowerCase()
}

export const CASE_TRANSFORMS = [
  { id: 'lower', label: 'lowercase', fn: toLowerCase },
  { id: 'upper', label: 'UPPERCASE', fn: toUpperCase },
  { id: 'title', label: 'Title Case', fn: toTitleCase },
  { id: 'camel', label: 'camelCase', fn: toCamelCase },
  { id: 'pascal', label: 'PascalCase', fn: toPascalCase },
  { id: 'snake', label: 'snake case', fn: toSnakeCase },
  { id: 'kebab', label: 'kebab-case', fn: toKebabCase },
  { id: 'constant', label: 'CONSTANT_CASE', fn: toConstantCase },
]
