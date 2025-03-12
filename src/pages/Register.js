import { React, useEffect, useLayoutEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import InputItem from "../components/form/InputItem";
import SelectItem from "../components/form/SelectItem";
import Loading from "../components/Loading";
import { Roles, userRegister, UserContext } from "../store";

function Register() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: "percyku19@gmail.com",
      // password: "fun123",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("Register submit", data);

    // const baToken = "Basic " + window.btoa(data.username + ":" + data.password);

    // try {
    //   let response = await AuthService.loginforLearnSys(
    //     baToken,
    //     `ROLE_${data.role}`
    //   );
    //   console.log(response);
    //   navigate("/login");
    // } catch (e) {
    //   console.log("error", e);
    //   console.log("error", e.status);
    //   console.log("error", e.message);
    // }
    setIsLoading(true);
    setTimeout(() => {
      let checked = true;
      userRegister.forEach((item) => {
        if (data.username === item.username) {
          checked = false;
          setErrorMsg("此帳密已經註冊過了");
        }
      });

      if (checked) {
        dispatch({
          type: "REGISTER",
          payload: {
            ...state,
            username: data.username,
            password: data.password,
            role: data.role,
          },
        });
        navigate("/login");
      }
      setIsLoading(false);
    }, 1500);
  };

  const watchForm = useWatch({
    control,
  });

  useEffect(() => {
    if (state.username !== "") {
      navigate("/profile");
    }
  }, []);

  // useEffect(() => {
  //   console.log(getValues()); // 可以使用 getValues 取得所有、特定值
  //   // console.log("errors", errors);
  //   // 或是使用 setValues 寫入值
  // }, [watchForm]); // 將新變數傳入

  return (
    <div className="container">
      <Loading isLoading={isLoading} />

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <InputItem
            id="username"
            type="text"
            errors={errors}
            labelText="使用者名稱"
            register={register}
            rules={{
              required: "使用者名稱為必填",
              maxLength: {
                value: 30,
                message: "使用者名稱長度不超過 10",
              },
            }}
          />
        </div>

        <div className="mb-3">
          <InputItem
            id="password"
            type="password"
            errors={errors}
            labelText="密碼"
            register={register}
            rules={{
              // required: { value: true, message: "使用者必填密碼" },
              required: "使用者名稱為密碼",
              minLength: {
                value: 5,
                message: "密碼不得小於10個字元",
              },
            }}
          />
        </div>

        <div className="mb-3">
          <SelectItem
            id="role"
            labelText="角色"
            errors={errors}
            register={register}
            rules={{
              required: "角色為必填",
            }}
          >
            <option value="">請選擇角色</option>
            {Roles.map((role, id) => {
              return (
                <option value={role} key={id}>
                  {role}
                </option>
              );
            })}
          </SelectItem>
        </div>

        <button type="submit" className="btn btn-info">
          註冊
        </button>
      </form>
    </div>
  );
}

export default Register;
