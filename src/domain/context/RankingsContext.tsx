import { createContext, FC, useContext, useEffect, useState } from "react";
import Ranking from "../../models/Ranking";
import axios from "../../config/axios";
import Api from "../../config/qpi";
import { RankingsSortBy } from "../../models/Ranking/helpers";

type RankingsUseCase = {
  rankings?: Ranking[];
  rankingsCount?: number;
  isLoading?: boolean;
  refetch: () => void;
  rankingQueryParams: GetRankingsQueryParams;
  setRankingQueryParams: (params: GetRankingsQueryParams) => void;
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
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState<number>(0);
  const [rankingQueryParams, setRankingQueryParams] = useState<GetRankingsQueryParams>({
    sortBy: RankingsSortBy.POPULARITY,
    page: 1,
  });
  const isLoading = true;
  const refetch = fetchRankingData;

  async function fetchRankingData() {
    const request = await axios
      .get(Api.fetchRankings.buildPath(), {
        params: rankingQueryParams,
      })
      .then((res) => {
        setRankings(res.data.rankings);
        setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  useEffect(() => {
    fetchRankingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <RankingsContext.Provider
      value={{
        rankings,
        rankingsCount,
        isLoading,
        refetch,
        rankingQueryParams,
        setRankingQueryParams,
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
