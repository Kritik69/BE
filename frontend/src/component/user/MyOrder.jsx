import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useRef } from 'react';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { clearErrors, myOrders } from "../../actions/OrderAction";
import { Link } from "react-router-dom";
import MetaData from "../../more/Metadata";
import LaunchIcon from "@material-ui/icons/Launch";
import emailjs from '@emailjs/browser';
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_ORDER_RESET } from "../../constans/OrderConstans";
import {
  deleteOrder,
} from "../../actions/OrderAction";
import "react-toastify/dist/ReactToastify.css";
import './../../more/Contact.css'
import ReactModal from 'react-modal';

const MyOrder = ({ history }) => {
  const form = useRef();
  
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);

  const { loading, error, orders } = useSelector((state) => state.myOrder);

  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteOrder);

  const { user } = useSelector((state) => state.user);

  let orderId = "";

  const deleteOrderHandler = async (id) => {
    orderId = id;
    if (window.confirm('Are you sure you want to cancel/return')) {
      dispatch(deleteOrder(id));
    } else {
      alert('Your order is NOT cancelled')
      console.log(user)
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_1t1hnoa', 'template_2vfma8n', form.current, 'mdKa3zwEHKliVBG3v')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    setIsOpen(false)
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
          <Button
              onClick={() => {
                setIsOpen(true)  
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
              }
            >
              Cancel
            </Button>
            </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      // history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(myOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  return (
    <>
    <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
      >
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <label className="form-labels">Name</label>
          <input className="form-inputs" type="text" name="user_name" value={user.name}/>
          <label className="form-labels">Email</label>
          <input className="form-inputs" type="email" name="user_email" value={user.email}/>
          <label className="form-labels">Message</label>
          <textarea  className="form-txt-area" name="message" />
          <input className="from-submit-btn" type="submit" value="Done" />
        </form>

    </ReactModal>
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

        </div>
        
      )}
      <BottomTab />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
    
    </>
  );
};

export default MyOrder;
