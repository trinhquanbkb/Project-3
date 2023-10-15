import React, { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Redirect, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FeatherIcons from "feather-icons-react";

// actions
import { resetAuth } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

// images
import { initLoginUser } from "../../redux/auth/reducers";

import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';

interface LocationState {
  from?: Location;
}

interface UserData {
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  return <div></div>;
};

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.login.data.user,
      loading: state.Auth.login.loading,
      error: state.Auth.login.error,
      userLoggedIn: state.Auth.login.data.user,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().required(t("Please enter email")),
      password: yup.string().required(t("Please enter Password")),
      checkbox: yup.bool().oneOf([true]),
    })
  );

  const onSubmit = (formData: UserData) => {
    dispatch(
      initLoginUser({
        email: formData["email"],
        password: formData["password"],
      })
    );
  };

  const location = useLocation<LocationState>();
  const redirectUrl =
    location.state && location.state.from ? location.state.from.pathname : "/";

  return (
    <>
      {userLoggedIn || user ? <Redirect to={redirectUrl}></Redirect> : null}
      <AuthLayout bottomLinks={<BottomLink />}>
        <div className="auth-logo mx-auto">
          <Link to="/" className="logo logo-dark">
            <span className="logo-lg">
              <img
                src={logoDark}
                alt=""
                height="42"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-lg">
              <img
                src={logoLight}
                alt=""
                height="42"
              />
            </span>
          </Link>
        </div>

        <h6 className="h5 mb-0 mt-3">{t("Chào mừng trở lại !")}</h6>
        <p className="text-muted mt-1 mb-4">
          {t(
            "Nhập địa chỉ email và mật khẩu của bạn để truy cập bảng quản trị."
          )}
        </p>

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          formClass="authentication-form"
        >
          <FormInput
            type="email"
            name="email"
            label={t("Email")}
            startIcon={<FeatherIcons icon={"mail"} className="icon-dual" />}
            placeholder={t("dpcargo@email.com")}
            containerClass={"mb-3"}
          />
          <FormInput
            type="password"
            name="password"
            label={t("Mật khẩu")}
            startIcon={<FeatherIcons icon={"lock"} className="icon-dual" />}
            action={
              <Link
                to="/auth/forget-password"
                className="float-end text-muted text-unline-dashed ms-1"
              >
                {t("Quên mật khẩu?")}
              </Link>
            }
            placeholder={t("Enter your Password")}
            containerClass={"mb-3"}
          ></FormInput>

          <FormInput
            type="checkbox"
            name="checkbox"
            label={t("Nhớ tài khoản")}
            containerClass={"mb-3"}
            defaultChecked
          />

          <div className="mb-3 text-center d-grid">
            <Button type="submit" disabled={loading}>
              {t("Đăng nhập")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
