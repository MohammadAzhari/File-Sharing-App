export default function Loading() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex items-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </div>
  );
}
