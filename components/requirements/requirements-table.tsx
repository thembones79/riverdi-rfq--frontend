import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";

export interface IRequirement {
  id: number;
  rfq_id: number;
  c_nc_cwr: string;
  requirement: string;
  note: string;
}

export interface RequirementsTableProps {
  rfq_id: number;
}

export const RequirementsTable: React.FC<RequirementsTableProps> = ({
  rfq_id,
}) => {
  const [requirementsTable, setRequirementsTable] = useState<IRequirement[]>(
    []
  );
  const { doRequest, errorsJSX } = useRequest({
    url: `/rfqs/${rfq_id}/requirements`,
    method: "get",
    onSuccess: (requirements: IRequirement[]) =>
      setRequirementsTable(requirements),
  });

  const renderTableHeader = () => {
    if (requirementsTable.length > 0) {
      const columns = ["requirement", "c / nc / cwr", "note"];
      return columns.map((column) => {
        return <th key={column}>{column}</th>;
      });
    }
  };

  const renderTableBody = () => {
    return requirementsTable.map((r) => {
      const { c_nc_cwr, requirement, note, id } = r;
      return (
        <tr key={id}>
          <td>{requirement}</td>
          <td>{c_nc_cwr}</td>
          <td>{note}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="table-container">
      <table className="table is-striped is-narrow is-hoverable is-fullwidth ">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody className="fixed200 ">{renderTableBody()}</tbody>
      </table>
      {errorsJSX()}
    </div>
  );
};
