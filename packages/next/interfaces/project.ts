import { Project } from '@prisma/client'

export type ToPrimitive<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends (..._args: any[]) => any
  ? (..._args: Parameters<T>) => ReturnType<T>
  : T extends object
  ? { [key in keyof T]: ToPrimitive<T[key]> }
  : T

/**
 * Expands a type so you can nicely seem the primitives
 */
export type Widen<T> = {
  [key in keyof T]: ToPrimitive<T[key]>
}

type ProjectType = Widen<
  Project & {
    _count: {
      whitelist: number
    } | null
  }
>

export type { ProjectType as Project }
