import { useScrollbarContext } from "@atlascode/core";
import axios, { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import Courses from "../components/Courses";
import HeroScreen from "../components/HeroScreen";
import GnosisLoader from "../components/Loader";
import Newsletter from "../components/Newsletter";
import ProductDefense from "../components/ProductDefense";
import Testimonials from "../components/Testimonials";
import {
  BlogCollectionType,
  CourseCollectionType,
  TestimonialCollectionType,
} from "../types";
import createCourseCollectionWithSlug from "../utility/courseCollectionSlug";
import React from "react";
import Head from "next/head";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import convertToSlug from "../utility/converToSlug";
import { getCalendarPickerSkeletonUtilityClass } from "@material-ui/lab";

export interface IndexPageProps {
  courses: CourseCollectionType[];
  blog?: BlogCollectionType[];
  testimonials?: TestimonialCollectionType[];
}

const getCourseByLevel = (courses: CourseCollectionType[]) => {
  const multiCategory = "MULTIDISCIPLINAR";
  const posCategory = "POS-GRADUACAO";
  const extCategory = "EXTENSAO";

  const coursesMulti = courses.filter((value, index) => {
    return convertToSlug(value.courseLevel).toUpperCase() === multiCategory;
  });

  const coursePos = courses.filter((value, index) => {
    console.log(convertToSlug(value.courseLevel).toUpperCase(), posCategory);

    return convertToSlug(value.courseLevel).toUpperCase() === posCategory;
  });

  const courseExt = courses.filter((value, index) => {
    return convertToSlug(value.courseLevel).toUpperCase() === extCategory;
  });

  return {
    coursePos,
    coursesMulti,
    courseExt,
  };
};

const IS_INITIAL_VISIT = "INITIAL_VISIT";

const setIfVisited = (
  positiveCallback: (...args: unknown[]) => void,
  negativeCallback: (...args: unknown[]) => void
) => {
  if (localStorage[IS_INITIAL_VISIT]) {
    positiveCallback();
  } else {
    negativeCallback();
    localStorage.setItem(IS_INITIAL_VISIT, "true");
  }
};

export function Index({
  courses,
  blog = [],
  testimonials = [],
}: IndexPageProps) {
  const [isInitialVisit, setIsInitialVisit] = React.useState(true);

  const coursesSeparated = React.useMemo(() => {
    return getCourseByLevel(courses);
  }, [courses]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIfVisited(
        () => {
          setIsInitialVisit(false);
          enableScroll();
        },
        () => setIsInitialVisit(true)
      );
    }
  }, []);

  const { disableScroll, enableScroll, scrollIntoView } = useScrollbarContext();

  const courseMultiWithSlug = React.useMemo(
    () => createCourseCollectionWithSlug(coursesSeparated.coursesMulti),
    []
  );

  const coursePosWithSlug = React.useMemo(
    () => createCourseCollectionWithSlug(coursesSeparated.coursePos),
    []
  );

  const courseExtWithSlug = React.useMemo(
    () => createCourseCollectionWithSlug(coursesSeparated.courseExt),
    []
  );

  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content="Instituto Educacional Gnosis - Cursos de pós-graduação na área da medicina."
        />
        <meta
          property="og:description"
          content="O Instituto Educacional Gnosis trabalha para trazer ao mercado cursos de pós-graduação, extensão e multidisciplinares capazes de impulsionar a sua carreira. Mantendo a excelência de uma instituição tradicional e trazendo ao mesmo tempo a modernidade do aprendizado à distância. Conheça nossos cursos de pós-graduação e extensão na área da medicina."
        />
        <meta
          name="description"
          content='content="O Instituto Educacional Gnosis trabalha para trazer ao mercado cursos de pós-graduação, extensão e multidisciplinares capazes de impulsionar a sua carreira. Mantendo a excelência de uma instituição tradicional e trazendo ao mesmo tempo a modernidade do aprendizado à distância. Conheça nossos cursos de pós-graduação e extensão na área da medicina."'
        />
      </Head>

      {isInitialVisit && (
        <GnosisLoader
          onAnimationStart={disableScroll}
          onAnimationEnd={enableScroll}
          animate={isInitialVisit}
        />
      )}

      <HeroScreen
        ctaLabel="Ver cursos"
        ctaCallback={() => scrollIntoView("#courses_section")}
      />
      <ProductDefense />
      <div id="courses_section">
        <Courses
          coursesExt={courseExtWithSlug.map((value, index) => {
            return {
              img: value.courseImage.imageURL,
              redirectLink: value.slug,
              items: [
                { icon: FaGraduationCap, text: value.courseArea },
                { icon: FaSchool, text: value.courseLevel },
              ],
              title: value.courseName,
              zoomEffect: true,
            };
          })}
          coursesMulti={courseMultiWithSlug.map((value, index) => {
            return {
              img: value.courseImage.imageURL,
              redirectLink: value.slug,
              items: [
                { icon: FaGraduationCap, text: value.courseArea },
                { icon: FaSchool, text: value.courseLevel },
              ],
              title: value.courseName,
              zoomEffect: true,
            };
          })}
          coursesPos={coursePosWithSlug.map((value, index) => {
            return {
              img: value.courseImage.imageURL,
              redirectLink: value.slug,
              items: [
                { icon: FaGraduationCap, text: value.courseArea },
                { icon: FaSchool, text: value.courseLevel },
              ],
              title: value.courseName,
              zoomEffect: true,
            };
          })}
        />
      </div>
      <Newsletter />

      {testimonials.length > 0 && (
        <div>
          <Testimonials
            items={testimonials.map((value, index) => {
              return {
                color: "primary",
                identification: value.testimonialLocation,
                name: value.testimonialName,
                testimonial: value.testimonialText,
                image: {
                  alt: value.testimonialPicture.imageDescription,
                  src: value.testimonialPicture.imageURL,
                },
              };
            })}
          />
        </div>
      )}
    </div>
  );
}

export default Index;

export const getStaticProps: GetStaticProps<IndexPageProps> = async ({
  params,
}) => {
  const courseRequest: AxiosResponse<CourseCollectionType[]> = await axios.get(
    "https://us-central1-gnosis-webapp.cloudfunctions.net/api/collections/entries/coursesNew"
  );
  const blogRequest: AxiosResponse<BlogCollectionType[]> = await axios.get(
    "https://us-central1-gnosis-webapp.cloudfunctions.net/api/collections/entries/gnosisBlog"
  );
  const testimonialRequest: AxiosResponse<TestimonialCollectionType[]> =
    await axios.get(
      "https://us-central1-gnosis-webapp.cloudfunctions.net/api/collections/entries/testimonials"
    );

  const courseData = courseRequest.data;
  const blogData = blogRequest.data;
  const testimonialData = testimonialRequest.data;

  return {
    props: {
      courses: courseData,
      testimonials: testimonialData,
      blog: blogData,
    },
  };
};
