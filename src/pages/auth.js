import { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useMutation, useQuery } from "@apollo/client";
import { LOG_IN, SIGN_UP } from "../graphql/mutations";
import { Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const formRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [formValue, setFormValue] = useState({});
  const navigate = useNavigate();

  const [signupUser, { data, loading, error }] = useMutation(SIGN_UP);
  const [
    loginUser,
    { data: userData, loading: userLoading, error: userError },
  ] = useMutation(LOG_IN, {
    onCompleted(data) {
      localStorage.setItem("token", data.signin.token);
      console.log(data.signin.token, "SUER DATA");
      navigate("/");
    },
  });

  const onChangeHandler = (evt) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      [evt.target.name]: evt.target.value,
    }));
    console.log(formValue, "form value");
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log("submit");
    if (isLogin) {
      //login
      loginUser({ variables: { user: formValue } });
    } else {
      signupUser({ variables: { newUser: formValue } });
    }
  };
  if (loading || userLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container maxWidth={"xs"} disableGutters={true}>
      <Box
        onSubmit={submitHandler}
        component="form"
        ref={formRef}
        sx={{ height: "90vh" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card sx={{ padding: "25px" }}>
          <Stack direction={"column"} sx={{ width: "400px" }} spacing={2}>
            {data && <Alert severity="success">User is created</Alert>}
            {!!error && <Alert severity="error">{error.message}</Alert>}
            {!!userError && <Alert severity="error">{userError.message}</Alert>}
            {!isLogin && (
              <>
                <TextField
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  fullWidth={true}
                  onChange={onChangeHandler}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  fullWidth={true}
                  onChange={onChangeHandler}
                />
              </>
            )}
            <TextField
              id="email"
              label="Email"
              name="email"
              type={"email"}
              variant="outlined"
              fullWidth={true}
              onChange={onChangeHandler}
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              type={"password"}
              variant="outlined"
              fullWidth={true}
              onChange={onChangeHandler}
            />
            <Button type="submit" variant="contained">
              {isLogin ? "LOGIN" : "SIGN UP"}
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setIsLogin((prevValue) => !prevValue);
                setFormValue({});
                formRef.current.value = {};
              }}
            >
              {`WANT TO ${isLogin ? "SIGN UP" : "LOGIN"}?`}
            </Button>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
};

export default Auth;
