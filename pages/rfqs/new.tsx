import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { UserPicker } from "../../components/user-picker";
import { NiceButton } from "../../components/nice-button";
import { Loader } from "../../components/loader";
import { IUser } from "../users";
import { IRfq } from "./";

interface NewRfqProps {
  currentUser: IUser;
}

const NewRfq = ({ currentUser }: NewRfqProps) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    }
  });

  if (!currentUser) {
    return <div></div>;
  }

  const [eau, setEau] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [distributorId, setDistributorId] = useState(0);
  const [pmId, setPmId] = useState(0);
  const [kamId, setKamId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { doRequest, errorsJSX, inputStyle } = useRequest({
    url: "/rfqs",
    method: "post",
    body: {
      eau,
      customer_id: customerId,
      distributor_id: distributorId,
      pm_id: pmId,
      kam_id: kamId,
    },
    onSuccess: (rfq: IRfq) => onSuccess(rfq),
  });

  const onSuccess = (rfq: IRfq) => {
    Router.push(`/rfqs/${rfq.id}`);
    setIsLoading(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await doRequest();
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    Router.push("/rfqs");
  };

  const renderContent = () => (
    <form onSubmit={onSubmit}>
      <h1 className="title m-3 mb-5">🎯 New RFQ</h1>
      <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
        <div className="field m-3">
          <label className="label">EAU</label>
          <input
            className={inputStyle("eau")}
            type="number"
            autoFocus
            value={eau}
            onChange={(e) => setEau(parseInt(e.target.value))}
          />
        </div>

        <UserPicker
          handleChange={setCustomerId}
          label="Customer"
          fieldname="customerId"
          fetch="/customers"
        />

        <UserPicker
          handleChange={setDistributorId}
          label="Distributor"
          fieldname="distributorId"
          fetch="/distributors"
        />

        <UserPicker
          handleChange={setPmId}
          label="PM"
          fieldname="pmId"
          fetch="/users"
        />

        <UserPicker
          handleChange={setKamId}
          label="KAM"
          fieldname="kamId"
          fetch="/users"
        />
      </div>

      <div className="m-3 mt-6 ">
        <NiceButton>
          <i className="far fa-check-circle"></i>
          <span className="m-1"></span> Add RFQ
        </NiceButton>
        <span className="m-3"></span>
        <NiceButton color="cancel" onClick={(event) => onCancel(event)}>
          Cancel
        </NiceButton>
      </div>
    </form>
  );

  const renderLoader = () => (
    <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
      <p className="title is-4 mb-6 mt-3">Please Wait...</p>
      <p className="subtitle">Signing into SharePoint...</p>
      <p className="subtitle">Creating desired folders...</p>
      <Loader />
    </div>
  );

  return (
    <div className="full-page">
      <div className="card max-w-800 m-3 big-shadow">
        <div className="card-content">
          {isLoading ? renderLoader() : renderContent()}

          {errorsJSX()}
        </div>
      </div>
    </div>
  );
};

export default NewRfq;
