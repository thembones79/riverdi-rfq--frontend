import React, { useState } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { UserPicker } from "../../components/userPicker";
import { NiceButton } from "../../components/niceButton";

const NewRfq = () => {
  const [eau, setEau] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [distributorId, setDistributorId] = useState(0);
  const [pmId, setPmId] = useState(0);
  const [kamId, setKamId] = useState(0);
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
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="full-page">
      <div className="card max-w-800 m-3">
        <div className="card-content">
          <form onSubmit={onSubmit}>
            <h1 className="title m-3">🎯 New RFQ</h1>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
              <div className="field m-3">
                <label className="label">EAU</label>
                <input
                  className={inputStyle("eau")}
                  type="number"
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

            {errorsJSX()}
            <div className="m-3 mt-6 ">
              <NiceButton>Add RFQ</NiceButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRfq;
