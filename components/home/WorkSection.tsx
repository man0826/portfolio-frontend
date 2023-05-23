import {
  GetCategoriesDocument,
  GetCategoriesQuery,
  WorkEntity,
} from "@/graphql/generated.graphql";
import { useState } from "react";
import WorkItem from "./WorkItem";
import { useQuery } from "@apollo/client";

type Props = {
  works: WorkEntity[];
};

const WorksSection = ({ works }: Props) => {
  const [currentTagName, setCurrentTagName] = useState("All");
  const [selectedWorks, setSelectedWorks] = useState<WorkEntity[]>(works);
  const { data } = useQuery<GetCategoriesQuery>(GetCategoriesDocument);

  return (
    <>
      <div className="relative flex w-80 md:w-96 mx-auto mb-16 md:mb-20">
        <span
          onClick={() => {
            setCurrentTagName("All");
            setSelectedWorks(works);
          }}
          className={`${
            currentTagName === "All" ? "opacity-100" : "opacity-30"
          } w-1/4 text-sm md:text-base tracking-[0.12em] text-center font-lato transition-all duration-300 cursor-pointer`}
        >
          All
        </span>
        {data?.categories?.data.map((cat) => {
          const a = cat.attributes?.works?.data;
          return (
            <span
              key={cat.id}
              onClick={() => {
                setCurrentTagName(cat.attributes?.name ?? "");
                setSelectedWorks(cat.attributes?.works?.data as WorkEntity[]);
              }}
              className={`${
                currentTagName === cat.attributes?.name
                  ? "opacity-100"
                  : "opacity-30"
              } w-1/4 text-sm md:text-base tracking-[0.12em] text-center font-lato transition-all duration-300 cursor-pointer`}
            >
              {cat.attributes?.name}
            </span>
          );
        })}
        <div
          className={`${
            currentTagName == "Web"
              ? "left-1/4"
              : currentTagName == "Web(EC)"
              ? "left-2/4"
              : currentTagName == "App"
              ? "left-3/4"
              : "left-0"
          } w-1/6 h-0.5 bg-slate-800 ml-[4.16%] absolute top-8 md:top-10 transition-all duration-200`}
        ></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] md:gap-x-[4vw] lg:gap-x-10 gap-y-[9vw] sm:gap-y-[5vw] lg:gap-y-10">
        {selectedWorks.map((work) => {
          const { id, attributes } = work;
          {
            return attributes ? (
              <WorkItem key={id} id={id ? id : ""} work={attributes} />
            ) : null;
          }
        })}
      </div>
    </>
  );
};

export default WorksSection;
