import * as EndPoints from "../../api/endPoints";

import { coursesAction } from "./courses.slice";
import { StateDispatch } from "../reducer";
import { ApiService } from "../../api/api.service";

import { authActions } from "../auth/auth-slice";
import { getTokenConfig } from "../../utils/utils";
export const startFetchingCourses = (history?: any) => {
  return (dispatch: StateDispatch) => {
    dispatch(coursesAction.startFetchingCourses());

    ApiService.apiCall(EndPoints.GET_COURSES)
      .then((res) => {
        dispatch(coursesAction.fetchingCoursesSuccess(res?.data?.data?.data));
      })
      .catch((err: any) => {
        //console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
        if (history) {
          // history?.push('/notfound')
        }
      });
  };
};

export const startFetchingGroups = (history?: any) => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(EndPoints.GET_GROUPS)
      .then((res) => {
        dispatch(
          coursesAction.groupsFetchedSuccessfully(res?.data?.data?.data),
        );
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
        if (history) {
          // history?.push('/notfound')
        }
      });
  };
};
export const startFetchingDirections = (history?: any) => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(EndPoints.GET_DIRECTIONS)
      .then((res) => {
        dispatch(coursesAction.directionsFetchedSuccessfully(res?.data?.data));
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
        if (history) {
          // history?.push('/notfound')
        }
      });
  };
};

export const startFetchingGroupsForCourse = (id: string) => {
  return (dispatch: StateDispatch) => {
    dispatch(coursesAction.startFetchingGroups({}));

    ApiService.apiCall(EndPoints.GET_COURSE, id)
      .then((res) => {
        dispatch(
          coursesAction.startFetchingGroupsSuccess(res?.data?.data?.doc),
        );
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
      });
  };
};

export const startFetchingMentors = (history?: any) => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(EndPoints.GET_MENTORS)
      .then((res) => {
        dispatch(
          coursesAction.fetchingMetnorsSuccess(res?.data?.data?.mentors),
        );
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
      });
    if (history) {
      // history?.push('/notfound')
    }
  };
};
export const addToWaitingLeast = (courseId: string) => {
  return (dispatch: StateDispatch) => {
    let config = getTokenConfig();
    ApiService.apiCall(EndPoints.ADD_TO_WAITING_LEAST, { courseId }, config)
      .then((res) => {
        console.log(res);

        // dispatch(coursesAction.fetchingMetnorsSuccess(res?.data?.data?.mentors));
        dispatch(coursesAction.addedToWaitingLeast(true));
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
        dispatch(
          coursesAction.fetchingCoursesFile(
            err?.response?.data?.message || "something went wrong",
          ),
        );
      });
    // if(history){
    //   // history?.push('/notfound')
    // }
  };
};

export const buyCourse = (id: string, groupId: string) => {
  return (dispatch: StateDispatch) => {
    let combineIds = id + "comb" + groupId;
    ApiService.apiCall(EndPoints.PAYZE_URL, combineIds)
      .then((res) => {
        if (res.data?.paymentResponse) {
          dispatch(
            coursesAction.transactionInfoAdded(res.data?.paymentResponse),
          );
          localStorage.setItem(
            "trs",
            JSON.stringify(res.data?.paymentResponse),
          );
          window.open(res.data.paymentResponse?.transactionUrl, "_blank");
        } else {
          console.log("some parameters are missing");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
};
export const addStudentToGroup = (groupId: string, transactionId: string) => {
  return (dispatch: StateDispatch) => {
    const token = localStorage.getItem("jwt");
    let config = {
      headers: {
        Authorization: "",
      },
    };
    if (token && token !== "undefined") {
      config.headers.Authorization = "Bearer " + JSON.parse(token);
    }
    let body = {
      registerToGroupId: groupId,
      transactionId,
    };
    console.log("request");
    ApiService.apiCall(EndPoints.ADD_STUDENT_TO_GROUP, body, config)
      .then((res) => {
        dispatch(getUpdatedUser(res.data.user._id, groupId));
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(coursesAction.addingStudentToGroupFail({} as any));
      });
  };
};

export const getUpdatedUser = (id: string, groupId: string) => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(EndPoints.GET_USER, id)
      .then((res) => {
        const name = res.data.data.doc.courses.find(
          (gr: any) => gr.id === groupId,
        )?.name;
        dispatch(
          authActions.authenticationSuccess({ user: res.data.data.doc }),
        );
        dispatch(coursesAction.addedToGroupSuccessFully(name));
        console.log("ended succesfully");
      })
      .catch((err: any) => {
        console.log(err);
        console.log("error");
      });
  };
};

export const fetchMentorData = (id: string, history?: any) => {
  return (dispatch: StateDispatch) => {
    ApiService.apiCall(EndPoints.GET_USER, id)
      .then((res) => {
        const { mentorCourses } = res.data.data.doc;

        if (mentorCourses.length) {
          dispatch(startFetchingGroupsForCourse(mentorCourses[0]?._id));
        }

        dispatch(coursesAction.mentorDataFetched(res.data.data.doc));
      })
      .catch((err: any) => {
        console.log(err);

        if (history) {
          // history?.push('/notfound')
        }
      });
  };
};
