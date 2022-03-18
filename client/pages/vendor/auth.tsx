import { gql, useMutation } from '@apollo/client';
import { BackButton, Layout } from '@components/index';
import {
  Button,
  Input,
  Link as GeistLink,
  Page,
  Spacer,
  Text,
} from '@geist-ui/core';
import { AuthContextType, useAuth } from '@lib/auth';
import router from 'next/router';
import React, { useState } from 'react';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Auth = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loginState, setLoginState] = useState({
    isLogin: true,
    stateText: 'Login',
  });
  const { updateLoginDetails }: AuthContextType = useAuth()!;

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION, {
      onCompleted: (data) => {
        if (data.login.token) {
          updateLoginDetails(data.login.token, formState.email);
          console.log('data.login.token:', data.login.token);
          router.push('/vendor/dashboard');
        }
      },
    });
  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data.login.token) {
        updateLoginDetails(data.signup.token, formState.email);
        console.log('data.signup.token:', data.signup.token);
        router.push('/vendor/dashboard');
      }
    },
  });

  const toggleLoginState = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginState({
      isLogin: !loginState.isLogin,
      stateText: loginState.stateText === 'Login' ? 'Signup' : 'Login',
    });
  };
  const onButtonClick = async () => {
    if (loginState.isLogin) {
      login({
        variables: { email: formState.email, password: formState.password },
      });
    } else {
      signup({
        variables: {
          email: formState.email,
          password: formState.password,
          name: formState.name,
        },
      });
    }
  };

  return (
    <Layout customStyle="pt-28">
      {/* BACK BUTTON */}
      <BackButton href={'/'} />

      {/* PAGE CONTENT - AUTHENTICATION */}
      <Page>
        <Page.Header center={true}>
          <Text h2>{loginState.stateText}</Text>
        </Page.Header>
        <Page.Content>
          <div className="flex flex-col items-center">
            {/* INPUT */}
            <div className="flex flex-col items-center">
              {!loginState.isLogin && (
                <>
                  <Input
                    label="Name"
                    placeholder="Name"
                    width="100%"
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    value={formState.name}
                  />
                  <Spacer h={0.7} />
                </>
              )}
              <Input
                label="Email"
                placeholder="Email"
                width="100%"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                value={formState.email}
              />
              <Spacer h={0.7} />
              <Input.Password
                label="Password"
                placeholder="Password"
                width="100%"
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
                value={formState.password}
              />
            </div>

            <Spacer h={4} />

            <Button shadow type="secondary" onClick={onButtonClick}>
              {loginState.isLogin ? 'Login' : 'Create account'}
            </Button>

            <Spacer h={2} />

            {/* CHANGE TO LOGIN / SIGNUP */}
            <GeistLink color block onClick={toggleLoginState}>
              {loginState.isLogin && 'Create an account.'}
              {!loginState.isLogin && 'Have an account already?'}
            </GeistLink>
          </div>
        </Page.Content>
      </Page>
    </Layout>
  );
};

export default Auth;
