const Skeleton = ({ className }) => {
  return (
    <div className="flex">
    <div className={`skeleton-shimmer rounded-lg ${className}`} />
    </div>
  );
};

export default Skeleton;