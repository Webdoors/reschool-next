import { API_METHOD } from "./method";

// const base = process.env.NODE_ENV === 'development'? "http://localhost:4001/": "https://reeducate-backend.herokuapp.com/"
// let base = process.env.NODE_ENV === 'development'? "http://localhost:4001/" :"https://seashell-app-hpemz.ondigitalocean.app/"
let base =
  process.env.NODE_ENV === "development"
    ? "https://api.reschool.world/"
    : "https://api.reschool.world/";
let base2 =
  process.env.NODE_ENV === "development"
    ? "https://api.reschool.world"
    : "https://api.reschool.world";
// let base = "http://localhost:4001/"
// https://seashell-app-hpemz.ondigitalocean.app/api/v1/

const url = `${base}api/v1/`;
// export const img_route = `${base}img/users/`
// export const img_route_courses = `${base}img/courses/`
// export const img_route_icons = `${base}img/icons/`
// export const img_mentors = `${base}img/mentors/`
// export const event_images = `${base}img/events/`
export const img_route = `${base2}//storage/`;
export const img_route_courses = `${base2}//storage/`;
export const img_route_icons = `${base2}//storage/`;
export const img_mentors = `${base2}//storage/`;
export const event_images = `${base2}//storage/`;
export const pdf_certificates = `${base2}/certificates/`;

export const terms_route = `${base2}files/terms-and-condition.pdf`;
export interface Endpoint {
  api: string;
  method: API_METHOD;
  deltaUrl?: string;
  hasProxy?: boolean;
  authorization?: boolean;
}

export const LOGIN: Endpoint = {
  api: `${url}user/signin`,
  method: API_METHOD.POST,
};

export const SIGNUP: Endpoint = {
  api: `${url}user/signup`,
  method: API_METHOD.POST,
};
export const CREATE_USER: Endpoint = {
  api: `${url}user/create`,
  method: API_METHOD.POST,
};
export const UPDATE_ME: Endpoint = {
  api: `${url}user/updateMe`,
  method: API_METHOD.PATCH,
};

export const UPDATE_USER: Endpoint = {
  api: `${url}user/updateUser`,
  method: API_METHOD.PATCH,
};
export const ADD_TO_WAITING_LEAST: Endpoint = {
  api: `${url}courses/waitingLeast`,
  method: API_METHOD.PATCH,
};

export const GET_DIRECTIONS: Endpoint = {
  api: `${url}directions`,
  method: API_METHOD.GET,
};

export const GET_USER: Endpoint = {
  api: `${url}user/`,
  method: API_METHOD.GET,
};

export const LOG_OUT: Endpoint = {
  api: `${url}user/logout`,
  method: API_METHOD.GET,
};

export const GET_COURSES: Endpoint = {
  api: `${url}courses`,
  method: API_METHOD.GET,
};

export const DELETE_COURSE: Endpoint = {
  api: `${url}courses/`,
  method: API_METHOD.DELETE,
};
export const DELETE_USER: Endpoint = {
  api: `${url}user/`,
  method: API_METHOD.DELETE,
};
export const DELETE_GROUP: Endpoint = {
  api: `${url}group/`,
  method: API_METHOD.DELETE,
};
export const UPDATE_COURSE: Endpoint = {
  api: `${url}courses/`,
  method: API_METHOD.PATCH,
};
export const UPDATE_EVENTS: Endpoint = {
  api: `${url}events/`,
  method: API_METHOD.PATCH,
};
export const ADD_PARTICIPANT_EVENT: Endpoint = {
  api: `${url}events/participant/`,
  method: API_METHOD.PATCH,
};
export const CREATE_EVENT: Endpoint = {
  api: `${url}events/`,
  method: API_METHOD.POST,
};
export const DELETE_EVENT: Endpoint = {
  api: `${url}events/`,
  method: API_METHOD.DELETE,
};
export const CREATE_COURSE: Endpoint = {
  api: `${url}courses/`,
  method: API_METHOD.POST,
};
export const CREATE_GROUP: Endpoint = {
  api: `${url}group/`,
  method: API_METHOD.POST,
};

export const UPDATE_GROUP: Endpoint = {
  api: `${url}group/`,
  method: API_METHOD.PATCH,
};

export const GET_COURSE: Endpoint = {
  api: `${url}courses/`,
  method: API_METHOD.GET,
};
export const GET_MENTORS: Endpoint = {
  api: `${url}mentors`,
  method: API_METHOD.GET,
};
export const GET_GROUPS: Endpoint = {
  api: `${url}group`,
  method: API_METHOD.GET,
};
export const GET_CERT: Endpoint = {
  api: `${url}cert/`,
  method: API_METHOD.GET,
};
export const GET_ADDITIONAL: Endpoint = {
  api: `${url}additionalmodules/`,
  method: API_METHOD.GET,
};
export const GET_LOCATIONS: Endpoint = {
  api: `${url}locations`,
  method: API_METHOD.GET,
};

export const GET_TESTIMONIAL: Endpoint = {
  api: `${url}testimonials`,
  method: API_METHOD.GET,
};
export const GET_SLIDERS: Endpoint = {
  api: `${url}sliders`,
  method: API_METHOD.GET,
};
export const GET_MODULEMENTORS: Endpoint = {
  api: `${url}modulementors/`,
  method: API_METHOD.GET,
};
export const GET_MODULE: Endpoint = {
  api: `${url}module/`,
  method: API_METHOD.GET,
};
export const GET_ABOUT: Endpoint = {
  api: `${url}about`,
  method: API_METHOD.GET,
};
export const GET_NEWS: Endpoint = {
  api: `${url}news`,
  method: API_METHOD.GET,
};
export const GET_NEWSHOME: Endpoint = {
  api: `${url}newshome`,
  method: API_METHOD.GET,
};
export const GET_ARTICLE: Endpoint = {
  api: `${url}article/`,
  method: API_METHOD.GET,
};
export const GET_STUDENTS: Endpoint = {
  api: `${url}students/`,
  method: API_METHOD.GET,
};
export const UPDATE_STUDENT: Endpoint = {
  api: `${url}students/updateStudent`,
  method: API_METHOD.PATCH,
};
export const GET_ADMINS: Endpoint = {
  api: `${url}qwertysdghs/`,
  method: API_METHOD.GET,
};

export const PAYZE_URL: Endpoint = {
  api: `${url}checkout/`,
  method: API_METHOD.GET,
};

export const ADD_STUDENT_TO_GROUP: Endpoint = {
  api: `${url}group/add-student`,
  method: API_METHOD.POST,
};

export const GET_EVENTS: Endpoint = {
  api: `${url}events`,
  method: API_METHOD.GET,
};
export const GET_EVENTS_ADMIN: Endpoint = {
  api: `${url}events/admin`,
  method: API_METHOD.GET,
};
export const GET_C_TOKEN: Endpoint = {
  api: `${url}secc/`,
  method: API_METHOD.GET,
};
