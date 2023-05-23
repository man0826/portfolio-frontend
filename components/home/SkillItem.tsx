import { Skill } from "@/graphql/generated.graphql";
import { useEffect, useState } from "react";

type Props = {
  skill: Skill;
};

const SkillItem = ({ skill }: Props) => {
  const [isStart, setIsStart] = useState(false);
  const { name, percent } = skill;

  useEffect(() => {
    setIsStart(true);
  }, []);

  return (
    <div className="mb-4 md:mb-5">
      <p className="text-sm font-lato tracking-wider md:text-base mb-1">
        {name}
      </p>
      <div className="relative w-full h-10 md:h-11 bg-white">
        <div
          className="bg-sky-700 w-0 relative h-full transition-all duration-1000 ease-in-out"
          style={{
            width: isStart ? `${percent}%` : "0",
          }}
        >
          <span className="text-base md:text-lg text-white absolute top-2/4 left-7 -translate-y-2/4">
            {percent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
