import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./redux/user/userActions";
import CircularProgress from "@mui/material/CircularProgress"; // Example loading indicator

const UserContainer = ({ userData, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Add fetchUsers to the dependency array

  if (!userData) {
    return <p>Initial Loading...</p>; // Handle initial undefined state
  }

  if (userData.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress /> {/* Improved Loading Indicator */}
      </div>
    );
  }

  if (userData.error) {
    return <h2>Error: {userData.error}</h2>;
  }

  if (!userData.users || userData.users.length === 0) {
    return <h2>No users found.</h2>; // Handle empty user list
  }

  return (
    <div>
      <h2>User List</h2>
      <div>
        {userData.users.map((user) => (
          <p key={user.id}>{user.name}</p> // Add key prop for better performance
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user, // Corrected typo: userDate -> userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
