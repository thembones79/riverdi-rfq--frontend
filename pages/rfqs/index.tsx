import React, { useState, useEffect } from "react";
import Router from "next/router";
import { IUser } from "../users";
import { useRequest } from "../../hooks/useRequest";
import { by } from "../../utils/by";

interface RfqsTableProps {
  currentUser: IUser;
}

export interface IRfq {
  id: number;
  rfq_code: string;
  eau: number;
  customer: string;
  distributor: string;
  pm: string;
  kam: string;
  updated: string;
}

type ColumnType = keyof IRfq;
type OrderType = "asc" | "desc";

const RfqsTable = ({ currentUser }: RfqsTableProps) => {
  useEffect(() => {
    console.log({ currentUser });
    if (!currentUser) {
      Router.push("/");
    }
  });

  if (!currentUser) {
    return <div></div>;
  }

  const [rfqsTable, setRfqsTable] = useState<IRfq[]>([]);
  const [completeRfqsList, setCompleteRfqsList] = useState<IRfq[]>([]);
  const [sortingOrder, setSortingOrder] = useState<OrderType>("asc");
  const [sortingColumn, setSortingColumn] = useState<ColumnType>("updated");
  const [rfqCodeFilter, setRfqCodeFilter] = useState("");
  const [eauFilter, setEauFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [distributorFilter, setDistributorFilter] = useState("");
  const [pmFilter, setPmFilter] = useState("");
  const [kamFilter, setKamFilter] = useState("");
  const [updatedFilter, setUpdatedFilter] = useState("");

  const { doRequest, errorsJSX } = useRequest({
    url: "/rfqs",
    method: "get",
    onSuccess: (rfqs: IRfq[]) => fetchRfqs(rfqs),
  });

  const fetchRfqs = (rfqs: IRfq[]) => {
    setCompleteRfqsList(rfqs);
    setRfqsTable(rfqs);
  };

  const renderArrows = (column: ColumnType) => {
    if (sortingColumn === column) {
      if (sortingOrder === "asc") {
        return " ↑";
      } else return " ↓";
    }
    return "";
  };

  const sortTableBy = (column: ColumnType) => {
    let order = sortingOrder;

    if (column === sortingColumn) {
      if (order === "asc") {
        order = "desc";
        setSortingOrder("desc");
      } else {
        order = "asc";
        setSortingOrder("asc");
      }
    } else {
      setSortingOrder("asc");
      order = "asc";
      setSortingColumn(column);
    }

    setRfqsTable(rfqsTable.sort(by(column, order)));
  };

  const filterItems = (
    rfqCodeText: string,
    eauText: string,
    customerText: string,
    distributorText: string,
    pmText: string,
    kamText: string,
    updatedText: string
  ) => {
    const filteredItems = getFilteredItemsForText(
      rfqCodeText,
      "rfq_code",
      eauText,
      "eau",
      customerText,
      "customer",
      distributorText,
      "distributor",
      pmText,
      "pm",
      kamText,
      "kam",
      updatedText,
      "updated"
    );
    setRfqsTable(filteredItems);
  };

  const getFilteredItemsForText = (
    rfqCodeText: string,
    rfqCodeColumn: ColumnType,
    eauText: string,
    eauColumn: ColumnType,
    customerText: string,
    customerColumn: ColumnType,
    distributorText: string,
    distributorColumn: ColumnType,
    pmText: string,
    pmColumn: ColumnType,
    kamText: string,
    kamColumn: ColumnType,
    updatedText: string,
    updatedColumn: ColumnType
  ) => {
    if (completeRfqsList) {
      return completeRfqsList.filter((item) => {
        if (
          item[rfqCodeColumn] &&
          item[eauColumn] &&
          item[customerColumn] &&
          item[distributorColumn] &&
          item[pmColumn] &&
          item[kamColumn] &&
          item[updatedColumn]
        ) {
          return (
            item[rfqCodeColumn]
              .toString()
              .toLowerCase()
              .includes(rfqCodeText.toLowerCase()) &&
            item[eauColumn]
              .toString()
              .toLowerCase()
              .includes(eauText.toLowerCase()) &&
            item[customerColumn]
              .toString()
              .toLowerCase()
              .includes(customerText.toLowerCase()) &&
            item[distributorColumn]
              .toString()
              .toLowerCase()
              .includes(distributorText.toLowerCase()) &&
            item[pmColumn]
              .toString()
              .toLowerCase()
              .includes(pmText.toLowerCase()) &&
            item[kamColumn]
              .toString()
              .toLowerCase()
              .includes(kamText.toLowerCase()) &&
            item[updatedColumn]
              .toString()
              .toLowerCase()
              .includes(updatedText.toLowerCase())
          );
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  };

  const onRfqCodeFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRfqCodeFilter(e ? e.currentTarget.value : "");
    filterItems(
      e ? e.currentTarget.value : "",
      eauFilter,
      customerFilter,
      distributorFilter,
      pmFilter,
      kamFilter,
      updatedFilter
    );
  };

  const onEauFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEauFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      e ? e.currentTarget.value : "",
      customerFilter,
      distributorFilter,
      pmFilter,
      kamFilter,
      updatedFilter
    );
  };

  const onCustomerFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCustomerFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      eauFilter,
      e ? e.currentTarget.value : "",
      distributorFilter,
      pmFilter,
      kamFilter,
      updatedFilter
    );
  };

  const onDistributorFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDistributorFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      eauFilter,
      customerFilter,
      e ? e.currentTarget.value : "",
      pmFilter,
      kamFilter,
      updatedFilter
    );
  };

  const onPmFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPmFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      eauFilter,
      customerFilter,
      distributorFilter,
      e ? e.currentTarget.value : "",
      kamFilter,
      updatedFilter
    );
  };

  const onKamFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKamFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      eauFilter,
      customerFilter,
      distributorFilter,
      pmFilter,
      e ? e.currentTarget.value : "",
      updatedFilter
    );
  };

  const onUpdatedFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUpdatedFilter(e ? e.currentTarget.value : "");
    filterItems(
      rfqCodeFilter,
      eauFilter,
      customerFilter,
      distributorFilter,
      pmFilter,
      kamFilter,
      e ? e.currentTarget.value : ""
    );
  };

  const renderTableHeader = () => {
    if (rfqsTable.length > 0) {
      const columns = [
        "rfq_code",
        "eau",
        "customer",
        "distributor",
        "pm",
        "kam",
        "updated",
      ] as ColumnType[];
      return columns.map((column) => {
        return (
          <th
            key={column}
            className={column === "rfq_code" ? "is-200" : ""}
            onClick={() => sortTableBy(column)}
          >
            {column + renderArrows(column)}
          </th>
        );
      });
    }
  };

  const renderTableBody = () => {
    return rfqsTable.map((rfq) => {
      const { rfq_code, eau, customer, distributor, pm, kam, updated, id } =
        rfq;
      return (
        <tr key={id} onClick={() => Router.push(`/rfqs/${id}`)}>
          <td className="is-200">{rfq_code}</td>
          <td>{eau}</td>
          <td>{customer}</td>
          <td>{distributor}</td>
          <td>{pm}</td>
          <td>{kam}</td>
          <td>{updated}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="table-container">
      <table className="table is-striped is-narrow is-hoverable is-fullwidth is-size-7">
        <thead>
          <tr>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={rfqCodeFilter}
                onChange={(e) => {
                  onRfqCodeFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={eauFilter}
                onChange={(e) => {
                  onEauFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={customerFilter}
                onChange={(e) => {
                  onCustomerFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={distributorFilter}
                onChange={(e) => {
                  onDistributorFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={pmFilter}
                onChange={(e) => {
                  onPmFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={kamFilter}
                onChange={(e) => {
                  onKamFilterChange(e);
                }}
              />
            </td>
            <td>
              <input
                className="input is-small mb-3"
                placeholder="search..."
                value={updatedFilter}
                onChange={(e) => {
                  onUpdatedFilterChange(e);
                }}
              />
            </td>
          </tr>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody className="fixed200 ">{renderTableBody()}</tbody>
      </table>
      {errorsJSX()}
    </div>
  );
};

export default RfqsTable;
