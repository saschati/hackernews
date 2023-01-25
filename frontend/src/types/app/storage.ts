export default interface Storage {
  set(name: string, value: unknown): void
  has(name: string): boolean
  get(name: string, defaultVal: unknown): unknown
  remove(name: string): void
}
