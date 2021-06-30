import type { AppContext } from "next/app";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { UserPicker } from "../../../components/user-picker";
import { IUser } from "../../users";
import { NiceButton } from "../../../components/nice-button";
import { useRequest } from "../../../hooks/useRequest";
import { ssrRequest } from "../../../api/ssr-request";
import { IRfq } from "../";

interface IRfqWithIds extends IRfq {
  customer_id: number;
  distributor_id: number;
  pm_id: number;
  kam_id: number;
}

interface EditRfqProps {
  rfq: IRfqWithIds;
  currentUser: IUser;
}

const EditRfq = ({ rfq, currentUser }: EditRfqProps) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push("/");
    }
  });

  if (!currentUser) {
    return <div></div>;
  }

  if (!rfq) {
    return <h1>RFQ not found</h1>;
  } else {
    const { rfq_code, eau, customer_id, distributor_id, pm_id, kam_id, id } =
      rfq;

    const [newEau, setEau] = useState(eau);
    const [newCustomerId, setCustomerId] = useState(customer_id);
    const [newDistributorId, setDistributorId] = useState(distributor_id);
    const [newPmId, setPmId] = useState(pm_id);
    const [newKamId, setKamId] = useState(kam_id);
    const { doRequest, errorsJSX, inputStyle } = useRequest({
      url: `/rfqs/${id}`,
      method: "put",
      body: {
        eau: newEau,
        customer_id: newCustomerId,
        distributor_id: newDistributorId,
        pm_id: newPmId,
        kam_id: newKamId,
      },
      onSuccess: () => Router.push(`/rfqs/${id}`),
    });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await doRequest();
    };

    const onCancel = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      Router.push(`/rfqs/${id}`);
    };

    return (
      <div className="full-page">
        <div className="card max-w-800 m-3 big-shadow">
          <div className="card-content">
            <form onSubmit={onSubmit}>
              <h1 className="title m-3 mb-5 is-4">
                <i className="fas fa-edit mr-1"></i> Edit {rfq_code}
              </h1>
              <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div className="field m-3">
                  <label className="label">EAU</label>
                  <input
                    className={inputStyle("eau")}
                    type="number"
                    value={newEau}
                    onChange={(e) => setEau(parseInt(e.target.value))}
                  />
                </div>

                <UserPicker
                  handleChange={setCustomerId}
                  label="Customer"
                  fieldname="newCustomerId"
                  fetch="/customers"
                  initialValue={newCustomerId}
                />

                <UserPicker
                  handleChange={setDistributorId}
                  label="Distributor"
                  fieldname="newDistributorId"
                  fetch="/distributors"
                  initialValue={newDistributorId}
                />

                <UserPicker
                  handleChange={setPmId}
                  label="PM"
                  fieldname="newPmId"
                  fetch="/users"
                  initialValue={newPmId}
                />

                <UserPicker
                  handleChange={setKamId}
                  label="KAM"
                  fieldname="newKamId"
                  fetch="/users"
                  initialValue={newKamId}
                />
              </div>

              {errorsJSX()}
              <div className="m-3 mt-6 ">
                <NiceButton>
                  <i className="far fa-save"></i>
                  <span className="m-1"></span> Save RFQ
                </NiceButton>
                <span className="m-3"></span>
                <NiceButton color="cancel" onClick={onCancel}>
                  Cancel
                </NiceButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

EditRfq.getInitialProps = async (ctx: AppContext["ctx"]) => {
  const { rfqId } = ctx.query;
  const url = `/rfqs/${rfqId}`;
  const { data } = await ssrRequest(ctx, url);
  return { rfq: data };
};

export default EditRfq;
