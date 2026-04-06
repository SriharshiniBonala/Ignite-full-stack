import React, { useState } from "react";
import { sendRequest } from "../api/requestApi";
import { toast } from "react-toastify";

const RequestMentorModel = ({ mentor, onClose }) => {

  const [message, setMessage] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));

  const handleSubmit = async () => {

    const requestData = {
      studentId: student.id,
      mentorId: mentor.id,
      message: message
    };

    try {

      await sendRequest(requestData);

      toast.success("Request Sent Successfully");

      onClose();

    } catch (error) {

      console.error(error);

      toast.error("Error sending request");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-4">
          Request {mentor.name}
        </h2>

        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Send Request
          </button>

        </div>

      </div>

    </div>
  );
};

export default RequestMentorModel;