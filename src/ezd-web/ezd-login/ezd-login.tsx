
import './ezd-login.scss';
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { EzdInput } from '../../components/ezd-input/ezd-input';
import { Link, useNavigate } from '@tanstack/react-router';
import { EzdButton } from '../../components/ezd-button/ezd-button';
import { RegisterUserOpts, UserService } from '../../services/user-service';
import { ValidationError } from '../../models/error/validation-error';
import { validateEmailAddress, validatePassword, validateUserName } from '../../lib/input-validation';
import { EzdSpinner } from '../../components/ezd-spinner/ezd-spinner';

type EzdLoginProps = {
  register?: boolean;
};

/*
  Potential show/hide password icons:
  user_card_view.png - user card with eye
*/

const EMAIL_ERR_MSG = 'Invalid email';
const USERNAME_ERR_MSG = 'Invalid username';
const PASSWORD_ERR_MSG = 'Invalid password';

export function EzdLogin(props: EzdLoginProps) {

  const [ email, setEmail ] = useState<string>('');
  const [ userName, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const [ emailError, setEmailError ] = useState<string | undefined>(undefined);
  const [ userNameError, setUserNameError ] = useState<string | undefined>(undefined);
  const [ passwordError, setPasswordError ] = useState<string | undefined>(undefined);

  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginLabel = props.register
    ? 'Register'
    : 'Log in'
  ;
  const registerText = props.register
    ? 'Already have an account?'
    : 'Not a member?'
  ;
  const registerLinkText = props.register
    ? 'Log in'
    : 'Register now.'
  ;

  useEffect(() => {
    let emailValidationErr: ValidationError | undefined;
    let userNameValidationErr: ValidationError | undefined;
    let passwordValidationErr: ValidationError | undefined;

    emailValidationErr = validateEmailAddress(email);
    userNameValidationErr = validateUserName(userName);
    passwordValidationErr = validatePassword(password);

    if(emailValidationErr === undefined) {
      setEmailError(undefined);
    }
    if(userNameValidationErr === undefined) {
      setUserNameError(undefined);
    }
    if(passwordValidationErr === undefined) {
      setPasswordError(undefined);
    }
  }, [
    email,
    userName,
    password,
  ]);

  return (
    <div className="ezd-login">
      <div className="ezd-login-container window">
        <form onSubmit={($e) => {
          console.log('form onSubmit');
          setIsLoading(true);
          handleLoginSubmit()
            .catch(err => {
              console.error(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
          $e.preventDefault();
        }}>
          <div className="login-content">
            <div className="login-header">
              Welcome
            </div>
            {(props.register) && (  
              <div className="login-input">
                <div className="login-input-text">
                  Email
                </div>
                <EzdInput
                  type="email"
                  error={emailError !== undefined}
                  onChange={handleEmailChange}
                />
                {(emailError !== undefined) && (
                  <div className="input-error">
                    {
                      emailError
                    }
                  </div>
                )}
              </div>
            )}
            <div className="login-input">
              <div className="login-input-text">
                Username
              </div>
              <EzdInput
                type="text"
                error={userNameError !== undefined}
                onChange={handleUsernameChange}
              />
              {(userNameError !== undefined) && (
                <div className="input-error">
                  {
                    userNameError
                  }
                </div>
              )}
            </div>
            <div className="login-input">
              <div className="login-input-text">
                Password
              </div>
              <div className="password-input-container">
                <EzdInput
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  error={passwordError !== undefined}
                  onChange={handlePasswordChange}
                />
                <div className="show-hide-button-container">
                  <IconButton
                    className="show-hide-button"
                    size="small"
                    onClick={() => {
                      handleShowHideButtonClick();
                    }}
                  >
                    {
                      showPassword
                        ? <VisibilityOff/>
                        : <Visibility/>
                    }
                  </IconButton>
                </div>
              </div>
              {(passwordError !== undefined) && (
                <div className="input-error">
                  {
                    passwordError
                  }
                </div>
              )}
            </div>
            <div className="login-input">
              <div className="login-button-container">
                <EzdButton type="submit">
                  {
                    loginLabel
                  }
                </EzdButton>
                {isLoading && (
                  <EzdSpinner
                    className="login-spinner"                  
                  />
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="register-container">
          <div className="register-text">
            {
              registerText
            }
            &nbsp;
          </div>
          <div className="register-link">
            <Link to={
              props.register
                ? '/login'
                : '/login/register'
            }>
              {
                registerLinkText
              }
            </Link>
          </div>
        </div>
      </div>
      <div className="link-nav-container window">
        <div className="link-nav-inner">
          <Link to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );

  async function handleLoginSubmit() {
    if(props.register) {
      await registerUser();
    } else {
      await loginUser();
    }
  }

  async function loginUser() {
    console.log('login');
    let loginResp = await UserService.loginUser({
      userName,
      password,
    });
    if(loginResp !== undefined) {
      navigate({
        to: '/',
      });
      return;
    }
    // console.log({
    //   loginResp,
    // });

  }

  async function registerUser() {
    let registerUserOpts: RegisterUserOpts;
    let registerResp: Response;
    let emailValidationErr: Error | undefined;
    let userNameValidationErr: Error | undefined;
    let passwordValidationErr: Error | undefined;
    // if(
    //   !isString(email)
    //   || !isString(userName)
    //   || !isString(password)
    // ) {
    //   /*
    //     TODO: invalidate form and show error messages
    //   */
    //   return;
    // }
    emailValidationErr = validateEmailAddress(email);
    userNameValidationErr = validateUserName(userName);
    passwordValidationErr = validatePassword(password);

    console.log({
      passwordValidationErr,
    })

    if(emailValidationErr !== undefined) {
      setEmailError(EMAIL_ERR_MSG);
    }
    if(userNameValidationErr !== undefined) {
      setUserNameError(USERNAME_ERR_MSG);
    }
    if(passwordValidationErr !== undefined) {
      setPasswordError(PASSWORD_ERR_MSG);
    }

    if(
      (emailValidationErr !== undefined)
      || (userNameValidationErr !== undefined)
      || (passwordValidationErr !== undefined)
    ) {
      return;
    }

    registerUserOpts = {
      email,
      userName,
      password,
    };

    
    console.log('registerUserOpts');
    console.log(registerUserOpts);
    registerResp = await UserService.registerUser(registerUserOpts)
    console.log('registerResp');
    console.log(registerResp);
    if(registerResp.status === 200) {
      navigate({
        to: '/login'
      });
    }
  }

  function handleShowHideButtonClick() {
    let nextShowPassword: boolean;
    nextShowPassword = !showPassword;
    setShowPassword(nextShowPassword);
  }

  function handleEmailChange($e: React.ChangeEvent<HTMLInputElement>) {
    setEmail($e.target.value);
  }
  function handleUsernameChange($e: React.ChangeEvent<HTMLInputElement>) {
    setUsername($e.target.value);
  }
  function handlePasswordChange($e: React.ChangeEvent<HTMLInputElement>) {
    setPassword($e.target.value);
  }
}
