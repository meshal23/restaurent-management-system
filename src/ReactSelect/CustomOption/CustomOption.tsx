/* eslint-disable @typescript-eslint/no-explicit-any */

const CustomOption = (props: any) => {
  const user = props.data.componentData;
  if (!user) console.log("no user detected");

  console.log(user);
  return (
    <div
      ref={props.innerRef}
      {...props.innerProps}
      style={{
        padding: "10px",
        backgroundColor: props.isFocused ? "#f0f0f0" : "#fff",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: "bold", color: "#007bff" }}>{user.name}</div>
      <div style={{ color: "#28a745" }}>Postal Code: {user.email}</div>
      <div style={{ color: "#6f42c1" }}>Street: {user.address?.street}</div>
      <div style={{ color: "#fd7e14" }}>Qty: {user.username}</div>
    </div>
  );
};

export default CustomOption;
