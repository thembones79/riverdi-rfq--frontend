import { IColumn, SfTable } from "../../components/sf-table";

export interface IRfq {
  id: number;
  rfq_code: string;
  eau: number;
  customer: string;
}

const columns: IColumn<IRfq>[] = [
  { name: "rfq_code", label: "RFQ Code" },
  { name: "eau", label: "EAU" },
  { name: "customer", label: "Customer" },
];

const data = [
  { id: 1, rfq_code: "valueZ", eau: 99, customer: "valueP" },
  { id: 2, rfq_code: "valueY", eau: 88, customer: "valueR" },
  { id: 3, rfq_code: "valueX", eau: 77, customer: "valueQ" },
  { id: 4, rfq_code: "valueX", eau: 99, customer: "valueP" },
  { id: 5, rfq_code: "valueY", eau: 88, customer: "valueQ" },
  { id: 6, rfq_code: "valueZ", eau: 77, customer: "valueR" },
  { id: 7, rfq_code: "valueZ", eau: 99, customer: "valueP" },
  { id: 8, rfq_code: "valueY", eau: 88, customer: "valueQ" },
  { id: 9, rfq_code: "valueX", eau: 77, customer: "valueR" },
  { id: 10, rfq_code: "valueX", eau: 99, customer: "valueP" },
  { id: 11, rfq_code: "valueY", eau: 88, customer: "valueR" },
  { id: 12, rfq_code: "valueZ", eau: 77, customer: "valueQ" },
  { id: 13, rfq_code: "valueY", eau: 99, customer: "valueQ" },
  { id: 14, rfq_code: "valueZ", eau: 88, customer: "valueP" },
  { id: 15, rfq_code: "valueX", eau: 77, customer: "valueR" },
  { id: 16, rfq_code: "valueX77", eau: 77, customer: "valueR77" },
];

const DeleteMe = () => (
  <div>
    <SfTable columns={columns} rows={data} />
  </div>
);

export default DeleteMe;
