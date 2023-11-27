import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from './api.ts'

export function useMessage() {
  const query = useQuery({
    queryKey: ['messages'],
    queryFn: API.getMessages,
  })

  return {
    ...query,
    update: useUpdateMessage(),
    delete: useDeleteMessage(),
    add: useAddMessage(),
  }
}

export function useFruitMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['messages'])
    },
  })

  return mutation
}

export function useUpdateMessage() {
  return useFruitMutation(API.updateMessage)
}

export function useDeleteMessage() {
  return useFruitMutation(API.deleteMessage)
}

export function useAddMessage() {
  return useFruitMutation(API.addMessage)
}
