import { History } from "@prisma/client";
import { api } from "./api";

type FilterParams = {
  plu?: string;
  shopId?: number;
  dateFrom?: number;
  dateTo?: number;
  action?: string;
};

const base_url = "/history/";

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    filterHistory: builder.query<History[], FilterParams>({
      query: ({ plu, shopId, dateFrom, dateTo, action }) => {
        let params = new URLSearchParams();

        if (plu) params.append("plu", plu);
        if (shopId) params.append("shopId", shopId.toString());
        if (dateFrom) params.append("dateFrom", dateFrom.toString());
        if (dateTo) params.append("dateTo", dateTo.toString());
        if (action) params.append("action", action);

        return {
          url: `${base_url}get?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFilterHistoryQuery } = historyApi;
export const {
  endpoints: { filterHistory },
} = historyApi;
