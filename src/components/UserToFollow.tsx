const UserToFollow = () => {
  return (
    <div className="p-4 flex flex-col gap-3 border-b-2 border-gray-300">
      <div className="flex  gap-2">
        <div className="w-14 h-14 rounded-full bg-gray-300 mt-1"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-[#263b70] text-lg font-bold">Hassan Ibrahim</h2>
          <p className="text-[#263b70] font-medium">Graphic Designer</p>
          <button className="bg-[#263b70]  h-8 text-white font-semibold text-lg rounded-full px-8">
            + Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserToFollow;
