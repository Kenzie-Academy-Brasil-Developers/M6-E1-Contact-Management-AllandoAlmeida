
import React from "react";
import { UpdatingCustomerForm } from "../../../components/forms/UpdatingCustomerForm";
import { fetchCustomerParams } from "@/contexts/customerContext";
import { TCustomerParams } from "@/schema/customer.schema";

const CustomerParams = async ({ params }: TCustomerParams) => {
  const customer = await fetchCustomerParams({ params });

  return (
    <main>
      <ul>
        
        { customer && <UpdatingCustomerForm customer={customer} />}
      </ul>
    </main>
  );
};

export default CustomerParams;
