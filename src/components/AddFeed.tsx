const AddFeed = () => {
  return (
    <div className="border-b-1 border-t-1 border-gray-300">
      <div className="flex flex-col gap-2 items-center justify-center py-4">
        <div className="w-14 h-14 rounded-full bg-gray-300"></div>
        <h1 className="text-[#263b70] font-semibold text-center">
          Abeer Joma a-PhD Candidate in Psychology
        </h1>
        <p className="text-[#263b70]  text-center">
          MHPSS, GBV and Child Protection
        </p>
        <button className="rounded-full flex items-center justify-center text-#263b70] border-1 border-[#263b70] w-36 font-bold py-1">
          + Follow
        </button>
      </div>
    </div>
  );
};

export default AddFeed;
