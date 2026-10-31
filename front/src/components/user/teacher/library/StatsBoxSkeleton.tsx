import FlecheBas from "@pictures/icons/flecheBas.png";

function StatsBoxSkeleton() {
  const fieldsetStyle =
    "border-2 border-resolution-dark mb-2 px-2 py-1 max-w-full  rounded-md animate-pulse bg-gray-100";
  const legendStyle =
    "border border-resolution rounded-2xl ml-3 p-2 text-base animate-pulse bg-gray-300 h-[42px] w-[235px]";
  const tableStyle =
    "max-w-[98%] table-auto rounded-lg bg-white ml-2 border-separate border-spacing-y-2 h-[150px]";
  return (
    <div className="mt-4 w-full">
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}></legend>
        <div className="flex">
          <div className="w-4 animate-pulse bg-zinc-300 flex items-center justify-center rounded-full cursor-pointer">
            <img src={FlecheBas} className="w-4 h-4 block" />
          </div>
          <div className=" max-w-full w-full">
            <div className="max-h-[300px] overflow-y-auto ">
              <table className={tableStyle}></table>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className={fieldsetStyle}>
        <legend className={legendStyle}></legend>
        <div className="flex">
          <div className="w-4 animate-pulse bg-zinc-300 flex items-center justify-center rounded-full cursor-pointer">
            <img src={FlecheBas} className="w-4 h-4 block" />
          </div>
          <div className=" max-w-full w-full">
            <div className="max-h-[300px] overflow-y-auto ">
              <table className={tableStyle}></table>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default StatsBoxSkeleton;
