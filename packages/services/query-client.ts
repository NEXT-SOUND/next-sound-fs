import { QueryClient } from '@tanstack/react-query';

// Shared QueryClient singleton for the entire app
export const queryClient = new QueryClient();

export const getQueryClient = (): QueryClient => queryClient;


