import {
  GetWorkDocument,
  GetWorkQuery,
  GetWorksDocument,
  GetWorksQuery,
  WorkEntityResponse,
} from "@/graphql/generated.graphql";
import { initializeApollo } from "@/lib/apolloClient";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  work: WorkEntityResponse;
};

const Work: NextPage<Props> = ({ work }) => {
  const [isDisplayLoaded, setIsDisplayLoaded] = useState(false);
  const [isScreenshotLoaded, setIsScreenshotLoaded] = useState(false);
  const displayURL = work.data?.attributes?.display?.data?.attributes?.url;
  const screenshotURL =
    work.data?.attributes?.screenshot?.data?.attributes?.url;

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-28 px-4">
      <div className="max-w-5xl mx-auto">
        {!isDisplayLoaded ? (
          <Skeleton className="h-[33px] md:h-[44px] mb-[60px] md:mb-[90px]" />
        ) : (
          <div className="mb-16 md:mb-24 flex items-baseline">
            <h2 className="text-2xl md:text-4xl font-notoSans leading-snug tracking-[.075em]">
              {work.data?.attributes?.name}
            </h2>
            <p className="text-sm md:text-lg tracking-widest font-light font-lato relative ml-4 md:ml-5 pl-4 md:pl-5 before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-px before:h-4 md:before:h-5 before:bg-black">
              {work.data?.attributes?.category?.data?.attributes?.name}
            </p>
          </div>
        )}
        {displayURL && (
          <div className="mb-10 md:mb-12">
            {!isDisplayLoaded && <Skeleton className="h-[57vw] lg:h-[620px]" />}
            <Image
              className={`${
                isDisplayLoaded ? "opacity-100 !h-full" : "opacity-0 !h-0"
              }`}
              src={process.env.NEXT_PUBLIC_API_URL + displayURL}
              alt={work.data?.attributes?.name as string}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => {
                setIsDisplayLoaded(true);
              }}
            />
          </div>
        )}
        {!isDisplayLoaded ? (
          <Skeleton className="h-[70px] md:h-[52px] mb-8 md:mb-10" />
        ) : (
          <p className="mb-8 md:mb-10 text-sm md:text-base leading-relaxed tracking-[0.12em] font-notoSans">
            {work.data?.attributes?.description}
          </p>
        )}
        {work.data?.attributes?.url && (
          <>
            {!isDisplayLoaded ? (
              <Skeleton className="h-[23px] md:h-[25px]" />
            ) : (
              <Link
                className="pb-0.5 font-light text-sm md:text-base tracking-widest font-lato break-all transition-all duration-200 border-b-[0.5px] border-solid border-black hover:opacity-50"
                href={work.data.attributes.url}
                target="_blank"
              >
                {work.data?.attributes?.url}
              </Link>
            )}
          </>
        )}
        {work.data?.attributes?.github && (
          <>
            {!isDisplayLoaded ? (
              <Skeleton className="h-[40px] md:h-[25px] mt-4" />
            ) : (
              <dl className="md:flex mt-4 text-sm md:text-base tracking-widest font-light font-lato">
                <dt className="mr-2">
                  GitHub<span className="hidden md:inline-block">:</span>
                </dt>
                <dd>
                  <Link
                    className="pb-0.5 break-all transition-all duration-200 border-b-[0.5px] border-solid border-black hover:opacity-50"
                    href={work.data.attributes.github}
                    target="_blank"
                  >
                    {work.data.attributes.github}
                  </Link>
                </dd>
              </dl>
            )}
          </>
        )}
        {screenshotURL && (
          <div className="mt-24 md:mt-28 px-[8vw] lg:px-28">
            {!isScreenshotLoaded && <Skeleton className="h-[1500px]" />}
            <Image
              className={`${
                isScreenshotLoaded ? "opacity-100 !h-full" : "opacity-0 !h-0"
              }`}
              src={process.env.NEXT_PUBLIC_API_URL + screenshotURL}
              alt={work.data?.attributes?.name as string}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => {
                setIsScreenshotLoaded(true);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const {
    data: { works },
  } = await apolloClient.query<GetWorksQuery>({
    query: GetWorksDocument,
  });
  const paths =
    works?.data.map((work) => ({
      params: {
        id: work.id || "",
      },
    })) || [];

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    const apolloClient = initializeApollo();
    const {
      data: { work },
    } = await apolloClient.query<GetWorkQuery>({
      query: GetWorkDocument,
      variables: {
        id: params?.id,
      },
    });

    return {
      props: {
        work,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

export default Work;
