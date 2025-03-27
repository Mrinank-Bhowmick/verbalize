import MascotChat from "../mascotChat";

const Mascot = () => {
  return (
    <div className="mt-50 text-white mb-50">
      <div className="text-center font-extrabold text-6xl md:text-8xl py-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 font-sans mb-20">
        Chat With Mascot
      </div>
      <div className="">
        <MascotChat />
      </div>
    </div>
  );
};

export default Mascot;
