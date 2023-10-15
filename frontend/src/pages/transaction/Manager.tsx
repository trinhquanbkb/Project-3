import React from "react";

// components
import PageTitle from "../../components/PageTitle";

const TransactionManager = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Pages", path: "/pages/starter" },
          { label: "Starter", path: "/pages/starter", active: true },
        ]}
        title={"Starter"}
      />
    </>
  );
};

export default TransactionManager;
