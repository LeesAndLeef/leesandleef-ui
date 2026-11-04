export type QueryRunner<T> = (signal: AbortSignal) => Promise<T>

export type MutationRunner<T, V> = (variables: V) => Promise<T>
