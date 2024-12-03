import { DatePicker, Input, Select, Table } from "antd";
import { useFilterHistoryQuery } from "./app/services/history";
import { Container } from "./components/container";
import { useState } from "react";

type Filter = {
  plu?: string;
  shopId?: number;
  dateFrom?: number;
  dateTo?: number;
  action?: string;
};

function App() {
  const [filters, setFilters] = useState<Filter>({});

  const { data: history, isLoading, isError } = useFilterHistoryQuery(filters);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Действие",
      dataIndex: "action",
    },
    {
      title: "Дата и время",
      dataIndex: "timestamp",
    },
    {
      title: "ID Товара",
      dataIndex: "productId",
    },
    {
      title: "PLU",
      dataIndex: "plu",
    },
    {
      title: "ID Магазина",
      dataIndex: "shopId",
    },
    {
      title: "ID Остатка",
      dataIndex: "stockId",
    },
  ];

  const handleChangeShop = (e: any) => {
    setFilters({ ...filters, shopId: e.target.value });
  };
  const handleChangeAction = (value: string) => {
    setFilters({ ...filters, action: value });
  };
  const handleChangePLU = (e: any) => {
    setFilters({ ...filters, plu: e.target.value });
  };
  const handleChangeDateFrom = (value: any) => {
    if (value) {
      setFilters({ ...filters, dateFrom: value.toString() });
    } else {
      setFilters({...filters, dateFrom: undefined})
    }
  };
  const handleChangeDateTo = (value: any) => {
    if (value) {
      setFilters({ ...filters, dateTo: value.toString() });
    } else {
      setFilters({...filters, dateTo: undefined})
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Ошибка!</div>;
  }

  return (
    <div className="App">
      <Container>
        <div
          style={{
            margin: "21px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "14px",
            }}
          >
            <p>Действие</p>
            <Select
              style={{ width: "250px" }}
              options={[
                { value: "", label: "Все" },
                {
                  value: "Создан товар",
                  label: "Создан товар",
                },
                {
                  value: "Создан остаток",
                  label: "Создан остаток",
                },
                {
                  value: "Остаток увеличен (полки)",
                  label: "Остаток увеличен (полки)",
                },
                {
                  value: "Остаток уменьшен (полки)",
                  label: "Остаток уменьшен (полки)",
                },
                {
                  value: "Остаток уменьшен (заказ)",
                  label: "Остаток уменьшен (заказ)",
                },
                {
                  value: "Остаток увеличен (заказ)",
                  label: "Остаток увеличен (заказ)",
                },
              ]}
              defaultValue=""
              onChange={handleChangeAction}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "14px",
            }}
          >
            <p>ID Магазина</p>
            <Input type="number" onChange={(e) => handleChangeShop(e)} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "14px",
            }}
          >
            <p>PLU</p>
            <Input onChange={(e) => handleChangePLU(e)} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "14px",
            }}
          >
            <p>С (дата)</p>
            <DatePicker
              showTime
              onChange={handleChangeDateFrom}
              format="YYYY-MM-DDTHH:mm:ss.SSSZ"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "14px",
            }}
          >
            <p>По (дата)</p>
            <DatePicker
              showTime
              onChange={handleChangeDateTo}
              format="YYYY-MM-DDTHH:mm:ss.SSSZ"
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={history}
          pagination={{ pageSize: 10 }}
        />
      </Container>
    </div>
  );
}

export default App;
