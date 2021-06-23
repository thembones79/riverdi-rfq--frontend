import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { NiceButton } from "../../components/niceButton";
import { IRequirement } from "./requirements-table";

interface EditRequirementProps {
  id: number;
  idx: number;
  rfq_id: number;
  oldCnccwr: string;
  oldRequirement: string;
  oldNote: string;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  requirementsTable: IRequirement[];
  setRequirementsTable: React.Dispatch<React.SetStateAction<IRequirement[]>>;
}

export const EditRequirement: React.FC<EditRequirementProps> = ({
  id,
  idx,
  rfq_id,
  oldCnccwr,
  oldRequirement,
  oldNote,
  setIsModalActive,
  requirementsTable,
  setRequirementsTable,
}) => {
  const [cnccwr, setCnccwr] = useState("oldCnccwr");
  const [requirement, setRequirement] = useState("oldRequirement");
  const [note, setNote] = useState("oldNote");
  const { doRequest, errorsJSX } = useRequest({
    url: `/requirements/${id}`,
    method: "put",
    body: {
      rfq_id,
      c_nc_cwr: cnccwr,
      requirement,
      note,
    },
    onSuccess: (r: IRequirement) => onSuccessAction(r, idx),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsModalActive(false);
  };

  const resetForm = () => {
    setCnccwr("");
    setRequirement("");
    setNote("");
  };

  const onSuccessAction = (r: IRequirement, idx: number) => {
    let newTable = [...requirementsTable];

    newTable.splice(idx, 1);

    setRequirementsTable([
      ...newTable,
      {
        id: r.id,
        rfq_id,
        c_nc_cwr: cnccwr,
        requirement,
        note,
      },
    ]);

    resetForm();
    setIsModalActive(false);
  };

  useEffect(() => {
    setCnccwr(oldCnccwr);
    setRequirement(() => oldRequirement);
    setNote(oldNote);
    console.log({ oldCnccwr, oldRequirement, oldNote });
  }, [id]);

  return (
    <form onSubmit={onSubmit}>
      <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
        <div className="field m-3">
          <label className="label">requirement</label>
          <textarea
            className="textarea is-400"
            required
            name={requirement}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
        </div>
        <div className="field m-3">
          <label className="label">c / nc / cwr</label>
          <div className={`select `}>
            <select
              name={cnccwr}
              id={cnccwr}
              value={cnccwr}
              required
              onChange={(e) => {
                setCnccwr(e.target.value);
              }}
            >
              <option></option>
              <option value="c">c</option>
              <option value="nc">nc</option>
              <option value="cwr">cwr</option>
            </select>
          </div>
        </div>
        <div className="field m-3">
          <label className="label">note</label>
          <textarea
            className="textarea is-400"
            name={note}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={10}
          />
        </div>
      </div>

      {errorsJSX()}
      <div className="m-3 mt-6 ">
        <NiceButton>
          <i className="far fa-save"></i>
          <span className="m-1"></span> Save Requirement
        </NiceButton>
        <span className="m-3"></span>
        <NiceButton color="cancel" onClick={(event) => onCancel(event)}>
          Cancel
        </NiceButton>
      </div>
    </form>
  );
};
