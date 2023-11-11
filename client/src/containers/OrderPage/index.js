import React, { useEffect, useState } from "react";

import { Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import { BiRupee } from "react-icons/bi";
import Loading from "../../components/UI/Loading/loading";
import "./style.css";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([...user.orders]);
  }, [user]);

  const columns = [
    {
      dataField: "_id",
      text: "Order ID",
      sort: true,
      classes: "id-col",

      events: {
        onClick: (e) => {},
      },
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
    },
    {
      dataField: "totalAmount",
      text: "Price",
      sort: true,
    },

    {
      dataField: "paymentType",
      text: "Payment Type",
    },
  ];
  console.log(user);

  return (
    <Layout>
      <div className="gallery-container">
        <div className="gallery">
          <h1>Your Orders</h1>
          <div>
            <a className="prev" href="/">
              Home&nbsp;
            </a>{" "}
            <span> {">"} </span>
            <a href="#"> &nbsp; Orders</a>
          </div>
        </div>
      </div>
      {user.orders?.length ? (
        <div className="order-page-container my-4 mx-1">
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {user.orders?.length > 0 ? (
                  user.orders.map((order, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td
                          className="id-col"
                          onClick={() => {
                            props.history.push(`/order_details/${order._id}`);
                          }}
                        >
                          {order._id}
                        </td>
                        <td>
                          <BiRupee />
                          {order.totalAmount}
                        </td>
                        <td className="text-capitalize">
                          {order.paymentStatus}
                        </td>
                        <td className="text-uppercase">{order.paymentType}</td>
                      </tr>
                    );
                  })
                ) : (
                  <h1>No Orders</h1>
                )}
              </tbody>
            </Table>
          </>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default OrderPage;
