const PremiumSkeletonCard = ({ count = 6 }) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-md overflow-hidden border animate-pulse"
            style={{ animationDelay: `${index * 120}ms` }}
          >

            {/* IMAGE */}
            <div className="relative">
              <div className="h-[200px] sm:h-[220px] w-full skeleton-shimmer" />

              {/* badge */}
              <div className="absolute top-4 right-4">
                <div className="h-6 w-20 rounded-full skeleton-shimmer" />
              </div>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4">

              {/* TITLE + RIGHT */}
              <div className="flex justify-between items-start">

                <div className="space-y-2">
                  <div className="h-5 w-32 rounded skeleton-shimmer" />
                  <div className="h-4 w-24 rounded skeleton-shimmer" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-16 rounded skeleton-shimmer ml-auto" />
                  <div className="h-3 w-12 rounded skeleton-shimmer ml-auto" />
                </div>

              </div>

              {/* PRICE BOX */}
              <div className="flex gap-4">

                <div className="flex-1 bg-gray-100 rounded-2xl p-4 space-y-2">
                  <div className="h-3 w-20 rounded skeleton-shimmer" />
                  <div className="h-4 w-24 rounded skeleton-shimmer" />
                </div>

                <div className="flex-1 bg-[#64B90020] rounded-2xl p-4 space-y-2">
                  <div className="h-3 w-24 rounded skeleton-shimmer" />
                  <div className="h-4 w-20 rounded skeleton-shimmer" />
                </div>

              </div>

              {/* QTY + LOCATION */}
              <div className="flex justify-between">

                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-20 rounded skeleton-shimmer" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-24 rounded skeleton-shimmer" />
                </div>

              </div>

              {/* BUTTON */}
              <div>
                <div className="h-11 w-full rounded-xl skeleton-shimmer" />
              </div>

            </div>
          </div>
        ))}

    </>
  );
};
export default PremiumSkeletonCard;