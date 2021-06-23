import React, { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { NiceButton } from "../../components/niceButton";
import { IRequirement } from "./requirements-table";

interface NewRequirementProps {
  rfq_id: number;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  requirementsTable: IRequirement[];
  setRequirementsTable: React.Dispatch<React.SetStateAction<IRequirement[]>>;
}

export const NewRequirement: React.FC<NewRequirementProps> = ({
  rfq_id,
  setIsModalActive,
  requirementsTable,
  setRequirementsTable,
}) => {
  const [cnccwr, setCnccwr] = useState("");
  const [requirement, setRequirement] = useState("");
  const [note, setNote] = useState("");
  const { doRequest, errorsJSX, inputStyle } = useRequest({
    url: "/requirements",
    method: "post",
    body: {
      rfq_id,
      c_nc_cwr: cnccwr,
      requirement,
      note,
    },
    onSuccess: (r: IRequirement) => onSuccessAction(r),
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

  const onSuccessAction = (r: IRequirement) => {
    setRequirementsTable([
      ...requirementsTable,
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
          <i className="far fa-check-circle"></i>
          <span className="m-1"></span> Add Requirement
        </NiceButton>
        <span className="m-3"></span>
        <NiceButton color="cancel" onClick={(event) => onCancel(event)}>
          Cancel
        </NiceButton>
      </div>
    </form>
  );
};
