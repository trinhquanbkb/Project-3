import React from "react";
import { useGetProductDetailQuery } from "../../../api/productApi";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";

const ViewInventory = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isFetching } = useGetProductDetailQuery(id);
	console.log(data);

	return <>{data ? <div></div> : <Loading />}</>;
};

export default ViewInventory;
