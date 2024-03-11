import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import { useActions} from "common/hooks";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { authThunks } from "features/auth/auth.reducer";
import { LoginParamsType } from "features/auth/auth.api";
import { ResponseType } from "common/types";
import s from "./styles.module.css";
import { TooltipDemo } from "../../../common/components/Tooltip/Tooltip";

type FormikErrorType = Partial<Omit<LoginParamsType, 'captcha'>>

export const Login = () => {
const {login}=useActions(authThunks)
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more";
      }

      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
   //   dispatch(authThunks.login(values))
        login(values)
        .unwrap()
        .catch((reason: ResponseType) => {
          const { fieldsErrors } = reason;
          if (fieldsErrors) {
            fieldsErrors.forEach((fieldError) => {
              formikHelpers.setFieldError(fieldError.field, fieldError.error);
            });
          }
        });
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={s.box}>
<div className={s.formContainer}>

        <Grid item xs={4}>
          <div style={{color:'#037afb', textAlign:'center', fontSize:'24px'}}>Sign in</div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>


              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
                <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
                <FormControlLabel
                  label={"Remember me"}
                  control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                />
                <Button
                  type={"submit"}
                  variant={"contained"}
                  disabled={!(formik.isValid && formik.dirty)}
                  color={"primary"}
                >
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>

          <p className={s.haveAccount}>{"Don't have an account?"}

              <TooltipDemo>
                  <p>You can use common test account credentials:</p>
                  <p> Email: free@samuraijs.com</p>
                  <p>Password: free</p>
              </TooltipDemo>


          </p>
          <div className={s.linkBox}>
            <a href={"https://social-network.samuraijs.com/signUp"} className={s.link}>Sign up?</a>
          </div>

        </Grid>
</div>
    </div>

  );
};
