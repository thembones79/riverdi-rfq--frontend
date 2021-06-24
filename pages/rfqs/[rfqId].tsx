import type { AppContext } from "next/app";
import Router from "next/router";
import { ssrRequest } from "../../api/ssr-request";
import { NiceButton } from "../../components/niceButton";
import { IRfq } from "./";
import { RequirementsTable } from "../../components/requirements/requirements-table";

interface IRfqWithNames extends IRfq {
  pm_fullname: string;
  kam_fullname: string;
}

interface ShowRfqProps {
  rfq: IRfqWithNames;
}

const ShowRfq = ({ rfq }: ShowRfqProps) => {
  if (!rfq) {
    return <h1>RFQ not found</h1>;
  } else {
    const {
      rfq_code,
      eau,
      customer,
      distributor,
      pm,
      kam,
      id,
      kam_fullname,
      pm_fullname,
    } = rfq;
    return (
      <div className="card ">
        <div className="card-content">
          <div className="mb-3 is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between is-flex-wrap-wrap">
            <h1 className="title my-3 is-4">{rfq_code}</h1>
            <div className="my-3 ">
              <NiceButton onClick={() => Router.push(`/rfqs/edit/${id}`)}>
                <i className="fas fa-edit"></i>
              </NiceButton>
              <span className="m-3"></span>
              <NiceButton
                color="danger"
                onClick={() => Router.push(`/rfqs/delete/${id}`)}
              >
                <i className="fas fa-trash-alt"></i>
              </NiceButton>
            </div>
          </div>

          <div className="is-flex is-flex-direction-row is-justify-content-space-between is-flex-wrap-wrap">
            <div className="field m-3">
              <label className="label">EAU</label>
              <div>{eau}</div>
            </div>

            <div className="field m-3">
              <label className="label">Customer</label>
              <div>{customer}</div>
            </div>
            <div className="field m-3">
              <label className="label">Distributor</label>
              <div>{distributor}</div>
            </div>
            <div className="field m-3">
              <label className="label">Project Manager</label>
              <div>
                {pm_fullname} ({pm})
              </div>
            </div>
            <div className="field m-3">
              <label className="label">Key Account Manager</label>
              <div>
                {kam_fullname} ({kam})
              </div>
            </div>
          </div>
        </div>

        <RequirementsTable rfq_id={id} />
      </div>
    );
  }
};

ShowRfq.getInitialProps = async (ctx: AppContext["ctx"]) => {
  const { rfqId } = ctx.query;
  const url = `/rfqs/${rfqId}`;
  const { data } = await ssrRequest(ctx, url);
  return { rfq: data };
};

export default ShowRfq;
