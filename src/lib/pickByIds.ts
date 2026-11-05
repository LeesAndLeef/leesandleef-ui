export const pickByIds = <T extends { id: string }>(items: readonly T[], ids: readonly string[]) =>
  ids.flatMap((id) => items.find((item) => item.id === id) ?? [])
