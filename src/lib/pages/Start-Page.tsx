import { motion } from "framer-motion";
import { AuroraBackground } from "../../Introduction/components/aurora-background";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setTimeout(() => {
      navigate("/signup");
    }, 200);
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">The future is in your hand</div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">Buy it</div>
        <button onClick={handleButtonClick} className="bg-black dark:bg-white rounded-lg w-fit text-white dark:text-black px-10 py-2">
          Now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
export default StartPage;
