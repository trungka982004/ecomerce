import { useMutation } from '@tanstack/react-query';

export const useMutationHooks = (fnCallback, options = {}) => {
  if (typeof fnCallback !== 'function') {
    throw new Error('The first argument to useMutationHooks must be a function');
  }

  const mutation = useMutation({
    mutationFn: fnCallback,
    ...options,
  });

  return mutation;
};
