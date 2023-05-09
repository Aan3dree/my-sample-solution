import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { render } from 'react-dom';

type Inputs = {
  Title: string,
  Matricula: number,
  Departamento: string,
  Cargo: string,
  Nascimento: Date
}

export default function Formbts(){
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  console.log(watch());
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label  className="form-label">Nome</label>
          <input  className="form-control" name="Title" ref={register}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Matricula</label>
          <input  className="form-control" name="Matricula" ref={register}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Departamento</label>
          <input  className="form-control" name="Departamento" ref={register}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Cargo</label>
          <input  className="form-control" name="Cargo" ref={register}/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Nascimento</label>
          <input type="date" className="form-control" name="Nascimento" ref={register}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  )
}

