import React from "react";
import { useRequest } from "../../hooks/useRequest";
import { NiceButton } from "../../components/niceButton";
import { IRequirement } from "./requirements-table";

interface DeleteRequirementProps {
  id: number;
  idx: number;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  requirementsTable: IRequirement[];
  setRequirementsTable: React.Dispatch<React.SetStateAction<IRequirement[]>>;
}

export const DeleteRequirement: React.FC<DeleteRequirementProps> = ({
  id,
  idx,
  setIsModalActive,
  requirementsTable,
  setRequirementsTable,
}) => {
  const { doRequest, errorsJSX } = useRequest({
    url: `/requirements/${id}`,
    method: "delete",
    onSuccess: () => onSuccessAction(),
  });

  const onClick = async () => {
    await doRequest();
  };

  const onSuccessAction = () => {
    let newTable = [...requirementsTable];
    newTable.splice(idx, 1);
    setRequirementsTable([...newTable]);
    setIsModalActive(false);
  };

  return (
    <div>
      <div className="m-3">
        <div>
          You are going to <b>delete</b> this requirement!
        </div>
        <div> Are you really sure you want to do this?</div>
      </div>
      <div className="m-3 mt-6 ">
        <NiceButton color="danger" onClick={() => onClick()}>
          <i className="far fa-trash-alt"></i> Delete Requirement
        </NiceButton>
      </div>
      {errorsJSX()}
    </div>
  );
};
