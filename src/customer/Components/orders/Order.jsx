import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import { getCutomerOrdersNew } from "../../../action/cart";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", vlue: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order, newOrder } = useSelector((store) => store);

  useEffect(() => {
    // dispatch(getOrderHistory({ jwt }));
  }, [jwt]);
  useEffect(() => {
    dispatch(getCutomerOrdersNew());
  }, []);

  // console.log("users orders ", newOrder?.orderNew?.orders);
  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    //   id={`filter-${section.id}-${optionIdx}`}
                    //   name={`${section.id}[]`}
                    defaultValue={option.value}
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    //   htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5 ">
            <p>Order History</p>
            {newOrder?.orderNew?.orders?.length > 0 &&
              newOrder?.orderNew?.orders?.map((order) => {
                return order?.lines?.map((item, index) => (
                  <OrderCard item={item} order={order} />
                ));
              })}
          </Box>
        </Grid>
      </Grid>

      <BackdropComponent open={false} />
    </Box>
  );
};

export default Order;
