import type { AppContext } from "next/app";
import { ssrRequest } from "../../api/ssr-request";
import { IRfq } from "./";
import { RequirementsTable } from "../../components/requirements/requirements-table";

interface ShowRfqProps {
  rfq: IRfq;
}

const ShowRfq = ({ rfq }: ShowRfqProps) => {
  if (!rfq) {
    return <h1>RFQ not found</h1>;
  } else {
    const { rfq_code, eau, customer, distributor, pm, kam, id } = rfq;
    return (
      <div>
        <div>
          <div>{rfq_code}</div>
          <div>{eau}</div>
          <div>{customer}</div>
          <div>{distributor}</div>
          <div>{pm}</div>
          <div>{kam}</div>
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
