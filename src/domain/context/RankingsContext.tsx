import { createContext, FC, useCallback, useContext, useEffect } from "react";
import Ranking from "../../models/Ranking";
import axios from "../../config/axios";
import Api from "../../config/qpi";
import { RankingsSortBy } from "../../models/Ranking/helpers";
import { useQuery } from "react-query";
import { useForm, UseFormSetValue } from "react-hook-form";

type RankingsUseCase = {
  rankings?: Ranking[];
  rankingsCount?: number;
  isLoading?: boolean;
  refetch: () => void;
  setQueryParams: UseFormSetValue<GetRankingsQueryParams>;
  resetQueryParams: () => void;
};

export const RankingsContext = createContext<RankingsUseCase | undefined>(undefined);

export type GetRankingsQueryParams = {
  keyword?: string | undefined;
  genreIds?: string[] | undefined;
  sortBy?: "popularity" | "newest_to_oldest" | undefined;
  page: number;
};

interface ReactContextProps {
  children: React.ReactNode;
}

// FIXME: Refactor
export const RankingsContextProvider: FC<ReactContextProps> = ({ children }) => {
  const { watch, reset, setValue } = useForm<GetRankingsQueryParams>();

  const fetchRankings = async () => {
    const res = axios.get(Api.fetchRankings.buildPath(), {
      params: {
        keyword: watch("keyword"),
        genreIds: watch("genreIds"),
        sortBy: watch("sortBy"),
        page: watch("page"),
      },
    });
    return res;
  };

  // TODO: uniqueKeyをもっとスマートに生成する
  const { data, refetch, isLoading } = useQuery(
    `fetchRankings/${watch("keyword")}/${watch("genreIds")}/${watch("sortBy")}/${watch("page")}`,
    fetchRankings,
    {
      onError: (e) => {
        console.log(e);
      },
    }
  );
  const resetQueryParams = useCallback(() => {
    reset({
      sortBy: RankingsSortBy.POPULARITY,
      page: 1,
    });
  }, [reset]);

  useEffect(() => {
    resetQueryParams();
  }, [resetQueryParams]);

  console.log("watch(sortBy)", watch("sortBy"));

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <RankingsContext.Provider
      value={{
        rankings: data?.data.rankings,
        rankingsCount: data?.data.totalDataNums,
        isLoading,
        refetch,
        setQueryParams: setValue,
        resetQueryParams,
      }}
    >
      {children}
    </RankingsContext.Provider>
  );
};

export const useRankingsContext = (): RankingsUseCase => {
  const context = useContext(RankingsContext);
  if (!context) throw new Error("RankingsContext is not defined");
  return context;
};
