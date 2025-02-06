import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import api, { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminUsers() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await api.post(
        "/api/users/get-all-users",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        console.log(response.data.data);
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null;
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false,
        };
      } else if (action === "block") {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === "unblock") {
        payload = {
          ...user,
          isBlocked: false,
        };
      }

      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/users/update-user-permissions",
        payload
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getUsers();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name", // Ensure unique key for column
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email", // Ensure unique key for column
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status", // Ensure unique key for column
      render: (text, record) => {
        return record.isBlocked ? "Blocked" : "Active";
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role", // Ensure unique key for column
      render: (text, record) => {
        if (record?.isAdmin) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action", // Ensure unique key for column
      render: (text, record) => (
        <div className="d-flex gap-3">
          {record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "unblock")}
              key={`${record._id}-unblock`}
            >
              UnBlock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "block")}
              key={`${record._id}-block`}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "remove-admin")}
              key={`${record._id}-remove-admin`}
            >
              Remove Admin
            </p>
          )}
          {!record?.isAdmin && (
            <p
              className="underline"
              onClick={() => updateUserPermissions(record, "make-admin")}
              key={`${record._id}-make-admin`}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Users" />
      </div>

      <Table
        columns={columns}
        dataSource={users.map((user) => ({
          ...user,
          status: user.isBlocked ? "Blocked" : "Active",
          role: user.isAdmin ? "Admin" : "User",
          action: "",
        }))}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default AdminUsers;
