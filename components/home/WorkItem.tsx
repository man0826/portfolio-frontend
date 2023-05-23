import { Work } from "@/graphql/generated.graphql";
import Image from "next/image";
import Link from "next/link";
import FadeAnimation from "../animation/FadeAnimation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

type Props = {
  id: string;
  work: Work;
};

const WorkItem = ({ id, work }: Props) => {
  const url = work.thumbnail?.data?.attributes?.url;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <FadeAnimation>
      {!isLoaded && (
        <Skeleton className="h-[85vw] sm:h-[42vw] md:h-[27vw] lg:h-[292px]" />
      )}
      <Link
        className={`${
          isLoaded ? "opacity-100 !h-full" : "opacity-0 !h-0"
        } group relative block w-full h-full before:w-full before:h-full before:bg-black before:mix-blend-multiply before:opacity-0 hover:before:opacity-70 before:transition-all before:duration-300 before:absolute before:top-0 before:left-0 before:z-10`}
        href={`/work/${id}`}
      >
        <Image
          src={url ? process.env.NEXT_PUBLIC_API_URL + url : ""}
          alt={work.name as string}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => {
            setIsLoaded(true);
          }}
        />
        <span className="text-white text-sm font-notoSans tracking-widest text-center whitespace-pre-wrap px-1 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
          {work.name}
        </span>
      </Link>
    </FadeAnimation>
  );
};

export default WorkItem;
