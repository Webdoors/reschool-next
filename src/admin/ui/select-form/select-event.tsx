import Form from "react-bootstrap/Form";
import { CourseModel } from "../../../models/courseModel";
import { EventModel } from "../../../models/event";

const SelectEvent: React.FC<{
  events: EventModel[];
  id?: string;
  valueChanged: (id: string) => void;
  roleChange?: boolean;
  defaultValue?: string;
  courses?: CourseModel[];
}> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.selectedOptions[0];
    if (!props.roleChange) {
      // console.log(option)

      const events = props?.events.find((cr: EventModel) => {
        return (
          cr.title === e.target.value ||
          cr._id === option?.getAttribute("data-id")
        );
      });

      if (events) {
        props.valueChanged(events._id);
      }
    } else {
      if (props?.courses?.length && option?.getAttribute("data-id")) {
        props.valueChanged(option.getAttribute("data-id") as string);
        return;
      }
      props.valueChanged(e.target.value);
    }
  };

  const FormSelect = Form.Select as any;
  return (
    <FormSelect
      onChange={changeHandler}
      defaultValue={
        props.events?.find((el: EventModel) => el._id === props.id)?.title ||
        props.defaultValue
      }
      aria-label="Default select example"
    >
      {!props?.courses?.length ? (
        props?.events?.length ? (
          props.events.map((data: EventModel) => {
            return (
              <option
                data-id={data?._id}
                style={{ cursor: "pointer", padding: "10px " }}
                key={data?._id}
              >
                {" "}
                {data.title}{" "}
              </option>
            );
          })
        ) : (
          <option> ივენთი არ მოიძებნა</option>
        )
      ) : (
        props.courses.map((data: CourseModel) => {
          return (
            <option
              data-id={data?._id}
              style={{ cursor: "pointer", padding: "10px " }}
              key={data?._id}
            >
              {" "}
              {data?.name_ka}{" "}
            </option>
          );
        })
      )}
    </FormSelect>
  );
};

export default SelectEvent;
