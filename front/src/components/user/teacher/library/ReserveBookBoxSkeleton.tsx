function ReserveBookBoxSkeleton() {
  //const de style
  const divCommentStyle = "mt-2 animate-pulse bg-gray-300 h-10 w-117";
  const fieldsetStyle =
    "border-2 border-resolution-dark mb-2 ml-2 px-2 py-1 bg-white max-w-full overflow-x-auto rounded-md";
  const legendStyle =
    "border border-resolution rounded-2xl ml-3 p-2 text-[1.1em] h-11 animate-pulse bg-resolution-50 h-5 w-32 rounded";
  return (
    <fieldset className={fieldsetStyle}>
      <legend className={legendStyle}></legend>
      <div className="mb-1">
        {/* Skeleton pour le select */}
        <div className="animate-pulse bg-gray-200 h-5 rounded-lg mb-3"></div>
      </div>

      <div>
        <div className="mt-2 mr-2 rounded-full border-2 border-gray-400 animate-pulse inline-block bg-gray-200 h-7 w-22"></div>
        <div className="mt-1 mr-2 rounded-full border-2 border-gray-400 animate-pulse inline-block bg-gray-200 h-6 w-40"></div>
      </div>
      <div className={divCommentStyle}> </div>
    </fieldset>
  );
}

export default ReserveBookBoxSkeleton;
