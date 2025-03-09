import React from "react";

function TextArea({
  id,
  labelText,
  register,
  errors,
  rules,
  row,
  defaulValue = "",
}) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <textarea
        id={id}
        rows={row}
        className={`form-control ${errors[id] && "is-invalid"}`}
        defaultValue={defaulValue}
        name={id}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
}

export default TextArea;
