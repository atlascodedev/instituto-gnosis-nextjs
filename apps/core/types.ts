export interface CourseCollectionType {
  courseArea: string;
  courseDescription: string;
  courseDuration: string;
  courseEmecPicture: {
    imageDescription: string;
    imageURL: string;
  };
  courseEmecURL: string;
  courseImage: {
    imageDescription: string;
    imageURL: string;
  };
  courseLevel: string;
  courseName: string;
  uuid: string;
  courseSyllabus: string[];
}
export interface BlogCollectionType {
  slug: string;
  blogActive: boolean;
  blogDescription: string;
  blogPost: string;
  blogTitle: string;
  featuredImage: {
    imageDescription: string;
    imageURL: string;
  };
  uuid: string;
}

export interface TestimonialCollectionType {
  slug: string;
  testimonialLocation: string;
  testimonialName: string;
  testimonialPicture: {
    imageDescription: string;
    imageURL: string;
  };
  testimonialText: string;
  uuid: string;
}
