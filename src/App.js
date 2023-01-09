import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required")
    })
  )
});

const App = () => {

  const [data, setData] = useState();

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      list: [{ firstName: '', lastName: '' }]
    },
    resolver: yupResolver(schema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list"
  });

  const onSave = data => {
    setData({ ...data });
  }

  return <form onSubmit={handleSubmit(onSave)}>
    <h4>Validate dynamic array form in React using React Hook Form - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h4>
    {fields.map((field, index) => (
      <div className="box" key={field.id}>
        <div>
          <input
            placeholder="Enter First Name"
            {...register(`list.${index}.firstName`)}
          />
          {errors?.list?.[index]?.firstName && <p>{errors?.list?.[index]?.firstName.message}</p>}
        </div>
        <div>
          <input
            className="ml10"
            placeholder="Enter Last Name"
            {...register(`list.${index}.lastName`)}
          />
          {errors?.list?.[index]?.lastName && <p>{errors?.list?.[index]?.lastName.message}</p>}
        </div>
        <div className="btn-box">
          {fields.length !== 1 && <button
            className="mr10"
            onClick={() => remove(index)}>Remove</button>}
          {fields.length - 1 === index && <button onClick={() => append({ firstName: '', lastName: '' })}>Add</button>}
        </div>
      </div>
    ))}
    <button>Submit</button>
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </form>
}

export default App;