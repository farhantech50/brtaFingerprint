import React from "react";
import { useAuthContext } from "../../contexts/authContext";

export default function LoginLanding() {
  const { loginLandData } = useAuthContext(); // Access loginLandData from context

  return (
    <div>
      <h1>Login Landing</h1>
      {loginLandData ? (
        <div>
          <h2>User Info</h2>
          <p>
            <strong>User ID:</strong> {loginLandData.userId}
          </p>
          <p>
            <strong>User Name:</strong> {loginLandData.userName}
          </p>
          <p>
            <strong>Employee ID:</strong> {loginLandData.employeeId}
          </p>
          <p>
            <strong>Email:</strong> {loginLandData.email || "Not available"}
          </p>
          <p>
            <strong>Mobile Number:</strong>{" "}
            {loginLandData.mobileNo || "Not available"}
          </p>
          <p>
            <strong>Full Name:</strong> {loginLandData.firstName}
          </p>
          <p>
            <strong>User Type:</strong> {loginLandData.userRole}
          </p>
          <p>
            <strong>Designation:</strong> {loginLandData.designation}
          </p>

          <h3>User Office List</h3>
          <ul>
            {loginLandData.userOfficeList.map((office, index) => (
              <li key={index}>
                <p>
                  <strong>Branch Name:</strong> {office.branchName}
                </p>
                <p>
                  <strong>Venue Name:</strong> {office.venueName}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
