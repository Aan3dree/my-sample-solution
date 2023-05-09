import * as React from "react";
import { Controller, SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import styles from '../AddItem.module.scss';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { sp} from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


type Inputs = {
  Title: string,
  Matricula: number,
  Departamento: string,
  Cargo: string,
  Nascimento: Date
};

export interface IFormProps {
  handleSave(): void;
};

export default function Form(props: IFormProps){

  const [alert, setAlert] = React.useState(false);

  const { register, handleSubmit, watch, errors, control, reset } = useForm<Inputs>();

  console.log(watch());

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    sp.web.lists.getByTitle('Colaboradores').items.add(data)
    .then((res) => {
      console.log("Item adicionado a lista");
      console.log(res);
      setAlert(true);
      reset();
      props.handleSave();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function resetAlert(){
    setAlert(false);
  }

  const registerOptions = {
    Title: { required: "Nome é um campo obrigatório" },
    Matricula: { required: "Matricula é um campo obrigatório" },
    Departamento: { required: "Departamento é um campo obrigatório" },
    Cargo: { required: "Cargo é um campo obrigatório" },
    Nascimento: { required: "Nascimento é um campo obrigatório" }
  };



  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formRow}>
          <Controller
            control={control}
            name="Title"
            defaultValue=""

            as={

              <TextField
                className={styles.formName}
                label="Nome"
                name="Title"
                fullWidth
                ref={register({ pattern: /^[A-Za-z]+$/i })}
              />

            }
            rules={registerOptions.Title}
          />
          <div className={styles.formItem}>
              <small className="text-danger">
                {errors.Title && errors.Title.message}
              </small>
          </div>
        </div>
        <div className={styles.formRow}>
          <Controller
            control={control}
            name="Matricula"
            defaultValue=""
            as={

              <TextField
                className={styles.formItem}
                placeholder="Matricula"
                name="Matricula"
                ref={register}
                type="number"
              />
            }
            rules={registerOptions.Matricula}
          />
          <div className={styles.formItem}>
              <small className="text-danger">
                {errors.Matricula && errors.Matricula.message}
              </small>
          </div>
          <Controller
            control={control}
            name="Departamento"
            defaultValue=""
            as={
              <TextField
                className={styles.formItem}
                placeholder="Departamento"
                name="Departamento"
                ref={register({ pattern: /^[A-Za-z]+$/i })}/>
            }
            rules={registerOptions.Departamento}
          />
          <div className={styles.formItem}>
              <small className="text-danger">
                {errors.Departamento && errors.Departamento.message}
              </small>
          </div>
          <Controller
            control={control}
            name="Cargo"
            defaultValue=""
            as={
              <TextField
                className={styles.formItem}
                placeholder="Cargo"
                name="Cargo"
                ref={register({ pattern: /^[A-Za-z]+$/i })}/>
            }
            rules={registerOptions.Cargo}
          />
          <div className={styles.formItem}>
              <small className="text-danger">
                {errors.Cargo && errors.Cargo.message}
              </small>
          </div>
        </div>
        <div className={styles.formRow}>
          <Controller
              control={control}
              name="Nascimento"
              defaultValue=""
              as={
                <TextField
                  data-date-format="YYYY-MM-DD"
                  id="date"
                  placeholder="Dt. Nascimento"
                  type="date"
                  defaultValue="aaaa-mm-dd"
                  className={styles.formDt}
                  name="Nascimento"
                  ref={register}
                />
              }
              rules={registerOptions.Nascimento}
            />
            <div className={styles.formItem}>
              <small className="text-danger">
                {errors.Nascimento && errors.Nascimento.message}
              </small>
          </div>
        </div>
        <div className={styles.formRow}>
              {alert ?
            <Collapse in={alert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={resetAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Colaborador adicionado com sucesso!
            </Alert>
          </Collapse>
            : <></>}
        </div>
        <div className={styles.formRow}>
          <Button
            variant="contained"
            color="secondary"
            //onClick={onSubmit}
            type="submit"
          >
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
}
