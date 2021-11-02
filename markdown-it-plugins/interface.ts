export interface Header {
  level: number
  title: string
  slug: string
}
export interface MarkdownParsedData {
  hoistedTags?: string[]
  links?: string[]
  headers?: Header[]
}