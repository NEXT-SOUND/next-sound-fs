import showToast from "@/lib/toast";
import {
  ApolloClient,
  FetchResult,
  HttpLink,
  InMemoryCache,
  OperationVariables,
} from "@apollo/client";
import {
  QueryObserverOptions,
  UseMutationOptions,
  useQueryClient,
  useMutation as useTanstackMutation,
  useQuery as useTanstackQuery,
  useSuspenseQuery as useTanstackSuspenseQuery,
} from "@tanstack/react-query";
import GLOBAL_ENV from "constants/global-env";
import PUBLIC_PAGES from "constants/public-pages";
import { DocumentNode } from "graphql";
import { useCallback } from "react";
import { queryClient } from "./query-client";

const createApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: GLOBAL_ENV.BACKEND_URL + "/graphql",
    }),
    cache: new InMemoryCache(),
  });

export type ApolloQueryResult<T, R = any> = {
  data: T | null | undefined;
  loading?: boolean | undefined;
  networkStatus?: number | undefined;
  stale?: boolean | undefined;
  errors?: any[] | undefined;
};

type TVariables<T> = T;

const getQueryKey = (query: DocumentNode, variables?: TVariables<any>) => {
  return ["query", query.definitions[0], variables];
};

const getMutationKey = (mutation: DocumentNode) => {
  return ["mutation", mutation.definitions[0]];
};

const handle401Error = () => {
  if (PUBLIC_PAGES.some((page) => window.location.pathname.includes(page))) {
    return;
  }

  showToast("Session expired. Please sign in again.");

  const currentPath = window.location.pathname + window.location.search;
  if (!currentPath.includes("/sign-in") && !currentPath.includes("/sign-up")) {
    localStorage.setItem("redirect", currentPath);
    //   TODO:
    window.location.href = "/sign-in";
    // history.push("/sign-in");
  }
};

const getGql = async <TResult, TVariables extends OperationVariables>(
  query: DocumentNode,
  variables?: TVariables,
) => {
  const queryKey = getQueryKey(query, variables);

  const cached =
    queryClient.getQueryData<Readonly<ApolloQueryResult<TResult>>>(queryKey);
  if (cached) {
    return cached as ApolloQueryResult<TResult>;
  }

  const client = createApolloClient();
  const result = await client.query<TResult, TVariables>({
    query,
    variables: variables as TVariables,
    fetchPolicy: "network-only",
  });

  queryClient.setQueryData(
    queryKey,
    result as Readonly<ApolloQueryResult<TResult>>,
  );

  return result;
};

/**
 * This hook is not supported cache. fetch requires variables instead of putting variables in the hook definition.
 */
const useLazyQuery = <
  TResult,
  TVariables extends OperationVariables,
  TSelectData = ApolloQueryResult<TResult>,
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<
    ApolloQueryResult<TResult>,
    TVariables,
    TSelectData
  >,
) => {
  const queryKey = getQueryKey(query, options?.variables);

  const props = useTanstackQuery<
    Readonly<ApolloQueryResult<TResult>>,
    TVariables,
    TSelectData
  >({
    queryKey,
    // Only this field is different from useQuery
    enabled: false,
    queryFn: async ({ signal }) => {
      const client = createApolloClient();
      const result = await client
        .query<TResult, TVariables>({
          query,
          variables: options?.variables as TVariables,
          context: {
            fetchOptions: {
              signal,
            },
          },
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        })
        .catch((error: any) => {
          if (
            error?.errors?.[0]?.errorType === "UnauthorizedException" ||
            error?.message?.includes("Token has expired") ||
            error?.statusCode === 401
          ) {
            handle401Error();
          }
          throw error;
        });

      return result as Readonly<ApolloQueryResult<TResult>>;
    },
    staleTime: 600000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error: any) => {
      // Retry only if the error is a system overload (429) and the failure count is less than 3.
      if (error.response?.status === 429 && failureCount < 3) {
        console.log(`Attempt ${failureCount + 1}: Throttled. Retrying...`);
        return true;
      }
      // All other errors result in an immediate failure.
      return false;
    },
    // `retryDelay` option: Determines the wait time between retries.
    retryDelay: (_attemptIndex, error: any) => {
      // Prefer the time specified by the server in the 'retry-after' header, default to 5 seconds if not provided.
      const retryAfterSeconds = error.response?.headers?.["retry-after"]
        ? parseInt(error.response.headers["retry-after"], 10)
        : 5;

      const delay = retryAfterSeconds * 1000; // Convert to milliseconds

      // Show a toast notification to the user before starting the retry.
      return delay;
    },
    ...options,
  });

  return { ...props, queryKey };
};

const useQuery = <
  TResult,
  TVariables extends OperationVariables,
  TSelectData = ApolloQueryResult<TResult>,
>(
  query: DocumentNode,
  options?: QueryHookOptions<
    ApolloQueryResult<TResult>,
    TVariables,
    TSelectData
  >,
) => {
  const queryKey = getQueryKey(query, options?.variables);

  const props = useTanstackQuery<
    Readonly<ApolloQueryResult<TResult>>,
    TVariables,
    TSelectData
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      const client = createApolloClient();
      const result = await client
        .query<TResult, TVariables>({
          query,
          variables: options?.variables as TVariables,
          context: {
            fetchOptions: {
              signal,
            },
          },
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        })
        .catch((error: any) => {
          if (
            error?.errors?.[0]?.errorType === "UnauthorizedException" ||
            error?.message?.includes("Token has expired") ||
            error?.statusCode === 401
          ) {
            handle401Error();
          }
          throw error;
        });

      return result as Readonly<ApolloQueryResult<TResult>>;
    },
    staleTime: 600000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error: any) => {
      // Retry only if the error is a system overload (429) and the failure count is less than 3.
      if (error.response?.status === 429 && failureCount < 3) {
        console.log(`Attempt ${failureCount + 1}: Throttled. Retrying...`);
        return true;
      }
      // All other errors result in an immediate failure.
      return false;
    },
    // `retryDelay` option: Determines the wait time between retries.
    retryDelay: (_attemptIndex, error: any) => {
      // Prefer the time specified by the server in the 'retry-after' header, default to 5 seconds if not provided.
      const retryAfterSeconds = error.response?.headers?.["retry-after"]
        ? parseInt(error.response.headers["retry-after"], 10)
        : 5;

      const delay = retryAfterSeconds * 1000; // Convert to milliseconds

      // Show a toast notification to the user before starting the retry.
      return delay;
    },
    ...options,
  });

  const setData = useCallback(
    (updater: (oldData: TResult | undefined) => TResult) => {
      queryClient.setQueryData<ApolloQueryResult<TResult>>(
        queryKey,
        (oldData) => ({
          ...oldData,
          data: {
            ...updater(oldData?.data as TResult),
          } as TResult,
        }),
      );
    },
    [queryKey],
  );

  return { ...props, queryKey, setData };
};

const useSuspenseQuery = <
  TResult,
  TVariables extends OperationVariables,
  TSelectData = ApolloQueryResult<TResult>,
>(
  query: DocumentNode,
  options?: QueryHookOptions<
    ApolloQueryResult<TResult>,
    TVariables,
    TSelectData
  >,
) => {
  const queryKey = getQueryKey(query, options?.variables);

  const props = useTanstackSuspenseQuery<
    Readonly<ApolloQueryResult<TResult>>,
    TVariables,
    TSelectData
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      const client = createApolloClient();
      const result = await client
        .query<TResult, TVariables>({
          query,
          variables: options?.variables as TVariables,
          context: {
            fetchOptions: {
              signal,
            },
          },
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        })
        .catch((error: any) => {
          if (
            error?.errors?.[0]?.errorType === "UnauthorizedException" ||
            error?.message?.includes("Token has expired") ||
            error?.statusCode === 401
          ) {
            handle401Error();
          }
          throw error;
        });

      return result as Readonly<ApolloQueryResult<TResult>>;
    },
    staleTime: 600000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error: any) => {
      // Retry only if the error is a system overload (429) and the failure count is less than 3.
      if (error.response?.status === 429 && failureCount < 3) {
        console.log(`Attempt ${failureCount + 1}: Throttled. Retrying...`);
        return true;
      }
      // All other errors result in an immediate failure.
      return false;
    },
    // `retryDelay` option: Determines the wait time between retries.
    retryDelay: (_attemptIndex, error: any) => {
      // Prefer the time specified by the server in the 'retry-after' header, default to 5 seconds if not provided.
      const retryAfterSeconds = error.response?.headers?.["retry-after"]
        ? parseInt(error.response.headers["retry-after"], 10)
        : 5;

      const delay = retryAfterSeconds * 1000; // Convert to milliseconds

      // Show a toast notification to the user before starting the retry.
      return delay;
    },
    ...options,
  });

  const setData = useCallback(
    (updater: TResult | ((oldData: TResult | undefined) => TResult)) => {
      queryClient.setQueryData(queryKey, updater);
    },
    [queryKey],
  );

  return { ...props, queryKey, setData };
};

const useMutation = <TResult, TInput extends OperationVariables = any>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TResult, TInput>,
) => {
  const mutationKey = getMutationKey(mutation);
  const controller = new AbortController();
  const queryClient = useQueryClient();

  const { mutateAsync, data, isSuccess, isPending, isError } =
    useTanstackMutation<ApolloQueryResult<TResult>, Error, TInput>({
      mutationKey,
      ...options,
      mutationFn: async (variables: TInput) => {
        const client = createApolloClient();
        const result = await client
          .mutate<TResult, TVariables<TInput>>({
            mutation,
            variables,
            context: {
              fetchOptions: {
                signal: controller.signal,
              },
            },
            errorPolicy: "all",
            fetchPolicy: "no-cache", //cache is supported by tanstack query
          })
          .catch((error: any) => {
            if (
              error?.errors?.[0]?.errorType === "UnauthorizedException" ||
              error?.message?.includes("Token has expired") ||
              error?.statusCode === 401
            ) {
              handle401Error();
            }
            throw error;
          });
        const mapped: ApolloQueryResult<TResult> = {
          data: (result as FetchResult<TResult>).data as
            | TResult
            | null
            | undefined,
          errors: (result as FetchResult<TResult>).errors
            ? ([...(result as FetchResult<TResult>).errors!] as any[])
            : undefined,
        };
        return mapped;
      },
    });

  const execute = (variables?: TInput): Promise<ApolloQueryResult<TResult>> =>
    mutateAsync(variables as TInput);

  const cancel = () => {
    controller.abort();
    queryClient.cancelQueries({ queryKey: mutationKey });
  };

  return {
    execute,
    data,
    isSuccess,
    isLoading: isPending,
    isError,
    mutationKey,
    cancel,
  };
};

type QueryHookOptions<TData, TVariables, TSelectData = TData> = {
  variables?: TVariables;
  queryKey?: readonly unknown[];
} & Omit<QueryObserverOptions<TData, any, TSelectData>, "queryKey" | "queryFn">;

type MutationHookOptions<TResult, TInput> = Omit<
  UseMutationOptions<ApolloQueryResult<TResult>, Error, TInput>,
  "mutationFn"
>;

// @ts-ignore: intended
type LazyQueryHookOptions<TData, TVariables, TSelectData = TData> = {
  variables?: TVariables;
  queryKey?: readonly unknown[];
} & Omit<
  QueryObserverOptions<TData, any, TSelectData>,
  "queryKey" | "queryFn" | "enabled"
>;

type SuspenseQueryHookOptions<TData, TVariables, TSelectData = TData> = {
  variables?: TVariables;
  queryKey?: readonly unknown[];
} & Omit<QueryObserverOptions<TData, any, TSelectData>, "queryKey" | "queryFn">;

type MutationFunction<TResult, TVariables extends OperationVariables> = (
  variables: TVariables,
) => Promise<ApolloQueryResult<TResult>>;

type MutationResult<TResult> = {
  data?: TResult | null | undefined;
  errors?: any[];
};

type BaseMutationOptions<TResult, TVariables extends OperationVariables> = {
  variables: TVariables;
};

type SkipToken = never;
const skipToken: SkipToken = null as never;

export {
  getGql,
  skipToken,
  useLazyQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
};
export type {
  BaseMutationOptions,
  LazyQueryHookOptions,
  MutationFunction,
  MutationHookOptions,
  MutationResult,
  QueryHookOptions,
  ApolloQueryResult as QueryResult,
  SkipToken,
  SuspenseQueryHookOptions,
};
