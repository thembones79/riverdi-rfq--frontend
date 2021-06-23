import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { Modal } from "../modal";
import { NewRequirement } from "./new-requirement";
import { EditRequirement } from "./edit-requirement";

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

interface IHandleEditReq extends IRequirement {
  idx: number;
}

export const RequirementsTable: React.FC<RequirementsTableProps> = ({
  rfq_id,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const [requirementsTable, setRequirementsTable] = useState<IRequirement[]>(
    []
  );

  const [modalBody, setModalBody] = useState(
    <NewRequirement
      rfq_id={rfq_id}
      setIsModalActive={setIsModalActive}
      requirementsTable={requirementsTable}
      setRequirementsTable={setRequirementsTable}
    />
  );

  const [modalTitle, setModalTitle] = useState("");

  const { doRequest, errorsJSX } = useRequest({
    url: `/rfqs/${rfq_id}/requirements`,
    method: "get",
    onSuccess: (requirements: IRequirement[]) =>
      setRequirementsTable(requirements),
  });

  const renderTableHeader = () => {
    if (requirementsTable.length > 0) {
      const columns = ["requirement", "c / nc / cwr", "note", ""];
      return columns.map((column) => {
        return (
          <th
            className={
              column === "c / nc / cwr" || column === "" ? "is-120" : ""
            }
            key={column}
          >
            {column}
          </th>
        );
      });
    }
  };

  const renderTableBody = () => {
    return requirementsTable.map((r, idx) => {
      const { c_nc_cwr, requirement, note, id } = r;
      return (
        <tr key={id}>
          <td className="p-2">{requirement}</td>
          <td className="is-120 p-2">{c_nc_cwr}</td>
          <td className="p-2">{note}</td>
          <td className="is-120 p-2">
            <button
              onClick={() => {
                handleEditReq({ c_nc_cwr, requirement, note, id, idx, rfq_id });
              }}
              className="button is-link is-inverted is-rounded is-small mx-1 p-3"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button className="button is-danger is-inverted  is-rounded is-small mx-1 p-3">
              <i className="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  const handleEditReq = ({
    c_nc_cwr,
    requirement,
    note,
    id,
    idx,
    rfq_id,
  }: IHandleEditReq) => {
    const pupa = () => {
      return (
        <EditRequirement
          rfq_id={rfq_id}
          setIsModalActive={setIsModalActive}
          requirementsTable={requirementsTable}
          setRequirementsTable={setRequirementsTable}
          id={id}
          idx={idx}
          oldCnccwr={c_nc_cwr}
          oldRequirement={requirement}
          oldNote={note}
        />
      );
    };

    setModalBody(
      <EditRequirement
        rfq_id={rfq_id}
        setIsModalActive={setIsModalActive}
        requirementsTable={requirementsTable}
        setRequirementsTable={setRequirementsTable}
        id={id}
        idx={idx}
        oldCnccwr={c_nc_cwr}
        oldRequirement={requirement}
        oldNote={note}
      />
    );

    setModalTitle("Edit Requirement");

    setIsModalActive(true);
  };

  const handleNewReq = () => {
    setModalBody(
      <NewRequirement
        rfq_id={rfq_id}
        setIsModalActive={setIsModalActive}
        requirementsTable={requirementsTable}
        setRequirementsTable={setRequirementsTable}
      />
    );

    setModalTitle("New Requirement");

    setIsModalActive(true);
  };

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="table-container">
      <button onClick={handleNewReq}>New Requirement</button>
      <table className="table is-narrow is-striped is-hoverable is-fullwidth is-size-7">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody className="fixed200 ">{renderTableBody()}</tbody>
      </table>
      {errorsJSX()}
      <Modal
        modalTitle={modalTitle}
        modalBody={modalBody}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        noFooter
      />
    </div>
  );
};