import { createContext, FC, useContext, useState } from "react";
import Ranking from "../../models/Ranking";
import axios from "../../config/axios";
import Api from "../../config/qpi";
import { RankingsSortBy } from "../../models/Ranking/helpers";
import { useQuery } from "react-query";

type RankingsUseCase = {
  rankings?: Ranking[];
  rankingsCount?: number;
  isLoading?: boolean;
  refetch: () => void;
  rankingQueryParams: GetRankingsQueryParams;
  setRankingQueryParams: (params: GetRankingsQueryParams) => void;
  resetRankingQueryParams: () => void;
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
  const [rankingQueryParams, setRankingQueryParams] = useState<GetRankingsQueryParams>({
    sortBy: RankingsSortBy.POPULARITY,
    page: 1,
  });
  const resetRankingQueryParams = () =>
    setRankingQueryParams({
      sortBy: RankingsSortBy.POPULARITY,
      page: 1,
    });

  const fetchRankings = async () => {
    const res = axios.get(Api.fetchRankings.buildPath(), {
      params: rankingQueryParams,
    });
    console.log("fetchRankings呼ばれた");
    console.log("rankingQueryParams", rankingQueryParams);
    return res;
  };
  const { data, refetch, isLoading } = useQuery(
    `fetchRankings/${rankingQueryParams}`,
    fetchRankings,
    {
      onError: (e) => {
        console.log(e);
      },
    }
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <RankingsContext.Provider
      value={{
        rankings: data?.data.rankings,
        rankingsCount: data?.data.totalDataNums,
        isLoading,
        refetch,
        rankingQueryParams,
        setRankingQueryParams,
        resetRankingQueryParams,
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
