import Form from "react-bootstrap/Form";

const SelectForm: React.FC<{
  data: any[];
  id?: string;
  valueChanged: (id: string) => void;
  roleChange?: boolean;
  defaultValue?: string;
}> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.roleChange) {
      const option = e.target.selectedOptions[0];

      const course = props?.data.find((cr: any) => {
        return (
          cr.name == e.target.value ||
          cr._id === option?.getAttribute("data-id")
        );
      });

      if (course) {
        props.valueChanged(course._id);
      }
    } else {
      props.valueChanged(e.target.value);
    }
  };

  const FormSelect = Form.Select as any;
  return (
    <FormSelect
      onChange={changeHandler}
      defaultValue={
        !props.roleChange
          ? props.data?.find((el: any) => el._id === props.id)?.name
          : props.defaultValue
      }
      aria-label="Default select example"
    >
      {props.data.map((data: any) => {
        return (
          <option
            data-id={props.roleChange ? data : data?._id}
            style={{ cursor: "pointer", padding: "10px " }}
            key={props.roleChange ? data : data?._id}
          >
            {" "}
            {props.roleChange ? data : data?.name}
          </option>
        );
      })}
    </FormSelect>
  );
};

export default SelectForm;
