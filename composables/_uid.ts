import { v4 as uuid } from 'uuid'

export function use_uid() {
  // const _uid = computed(() => uuid())

  const _uid = uuid()

  return _uid
  // return ref(_uid)
}
