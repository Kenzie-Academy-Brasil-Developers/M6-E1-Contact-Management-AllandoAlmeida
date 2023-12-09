import {
  UpdatingCustomer,
} from "@/components/forms/UpdatingCustomerForm";
import {
  TCustomerParams,
  fetchCustomerParams,
} from "../service/profile.service";

const CustomerParams = async ({ params }: TCustomerParams) => {
  const customer = await fetchCustomerParams({ params });

  return (
    <main>
      <ul>
        <p>preciso rever essa função</p>
        <UpdatingCustomer customer={customer} />
      </ul>
    </main>
  );
};

export default CustomerParams;
