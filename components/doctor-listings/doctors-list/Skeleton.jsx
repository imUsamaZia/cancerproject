// SkeletonLoader.js
const SkeletonLoader = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "16px",
      width: "100%",
    }}
  >
    <div
      style={{
        height: "20px",
        width: "60%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "skeleton-loading 1.5s infinite ease-in-out",
      }}
    ></div>
    <div
      style={{
        height: "15px",
        width: "80%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "skeleton-loading 1.5s infinite ease-in-out",
      }}
    ></div>
    <div
      style={{
        height: "15px",
        width: "40%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "skeleton-loading 1.5s infinite ease-in-out",
      }}
    ></div>
    <style jsx>{`
      @keyframes skeleton-loading {
        0% {
          background-color: #e0e0e0;
        }
        50% {
          background-color: #cfcfcf;
        }
        100% {
          background-color: #e0e0e0;
        }
      }
    `}</style>
  </div>
);

export default SkeletonLoader;
