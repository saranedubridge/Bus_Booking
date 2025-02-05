import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { message, Card, Form, Input, Button, List } from "antd";

function Profile() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "`${import.meta.env.BACKEND_URL}/api/`bookings/get-bookings-by-user-id",
        {
          userId: user._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateProfile = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "`${import.meta.env.BACKEND_URL}/api/`users/update-profile",
        {
          ...values,
          userId: user._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="profile-container">
      <Card title="Profile Information">
        {editMode ? (
          <Form form={form} layout="vertical" onFinish={updateProfile}>
            <Form.Item label="Name" name="name" initialValue={user.name}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" initialValue={user.email}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </Form>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
          </div>
        )}
      </Card>
      <Card title="Booking History" className="mt-3">
        <List
          itemLayout="horizontal"
          dataSource={bookings}
          renderItem={(booking) => (
            <List.Item>
              <List.Item.Meta
                title={`Booking ID: ${booking._id}`}
                description={
                  <>
                    <p>
                      <strong>Bus Name:</strong> {booking.bus.name}
                    </p>
                    <p>
                      <strong>From:</strong> {booking.bus.from} -{" "}
                      <strong>To:</strong> {booking.bus.to}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.journeyDate}
                    </p>
                    <p>
                      <strong>Seats:</strong> {booking.seats.join(", ")}
                    </p>
                    <p>
                      <strong>Fare:</strong> ₹{" "}
                      {booking.fare * booking.seats.length}
                    </p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Profile;
