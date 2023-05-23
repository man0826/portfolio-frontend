import SkillItem from "@/components/home/SkillItem";
import WorksSection from "@/components/home/WorkSection";
import {
  GetSkillsDocument,
  GetSkillsQuery,
  GetWorksDocument,
  GetWorksQuery,
  SkillEntity,
  WorkEntity,
} from "@/graphql/generated.graphql";
import { initializeApollo } from "@/lib/apolloClient";
import { GetServerSideProps, NextPage } from "next";

type Props = {
  works: WorkEntity[];
  skills: SkillEntity[];
};

const Home: NextPage<Props> = ({ works, skills }) => {
  return (
    <>
      <section className="pt-24 md:pt-40 pb-12 md:pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-lato font-thin tracking-wider text-center mb-12 md:mb-14">
            Skills
          </h2>
          {skills.map((skill) => {
            const { attributes } = skill;
            {
              return attributes ? (
                <SkillItem key={skill.id} skill={attributes} />
              ) : null;
            }
          })}
        </div>
      </section>
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-lato font-thin tracking-wider text-center mb-12 md:mb-14">
            Works
          </h2>
          <WorksSection works={works} />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo();
    const {
      data: { works },
    } = await apolloClient.query<GetWorksQuery>({ query: GetWorksDocument });

    const {
      data: { skills },
    } = await apolloClient.query<GetSkillsQuery>({ query: GetSkillsDocument });

    return {
      props: {
        works: works?.data,
        skills: skills?.data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export default Home;
