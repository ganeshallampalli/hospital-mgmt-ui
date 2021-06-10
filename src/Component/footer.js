import React from "react";
export const FooterComponent = () => {
  return (
    <footer
      className="text-center text-lg-start bg-light text-muted"
      style={{
        bottom: "0",
        position: "static",
        width: "100%",
        marginTop: "100px",
      }}
    >
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © Copyright-Med-Connect Team
      </div>
    </footer>
  );
};
