"use client";

import { useContext } from "react";

import { CustomerContext, CustomerContextType } from "@/contexts/customer-context";

export function useCustomer() {
	const { customer } = useContext<CustomerContextType>(CustomerContext);
	if (!customer) {
		throw new Error("useOrder must be used within a OrderProvider");
	}

	return customer;
}