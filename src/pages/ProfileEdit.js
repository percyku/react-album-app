import { React, useState, useContext, memo } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import InputItem from "../components/form/InputItem";
import SelectItem from "../components/form/SelectItem";
import CheckBoxRadioItem from "../components/form/CheckBoxRadioItem";
import TextArea from "../components/form/TextArea";
import Loading from "../components/Loading";
import { UserContext, Roles, userRegister } from "../store/userStore";

const ProfileEdit = memo(({ closeProfileModal }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passRule, setPassRule] = useState({ disabled: true });
  const [accessKeyRule, setAccessKeyRule] = useState({ disabled: true });
  // console.log("ProfileEdit", state);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...state,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("ProfileEdit submit", data);

    setIsLoading(true);
    setTimeout(() => {
      if (
        userRegister.findIndex(
          (item) =>
            item.username === data.username && item.username !== state.username
        ) != -1
      ) {
        setErrorMsg(`${data.username} is exist,please change other name `);
      } else {
        dispatch({
          type: "UPDATE_USER_DATA",
          payload: {
            update_user_data: {
              username: data.username,
              password:
                data.password == undefined ? state.password : data.password,
              role: data.role,
              sexual: data.sexual,
              accessKey: data.accessKey,
              brief: data.brief,
            },
            update_id: userRegister.findIndex(
              (item) => item.username === state.username
            ),
          },
        });
        closeProfileModal();
        navigate("/login");
      }
      setIsLoading(false);
    }, 1500);
  };

  const watchForm = useWatch({
    control,
  });

  useEffect(() => {
    if (getValues("isCheckPass") === "true") {
      setPassRule({
        required: "輸入使用者密碼",
        minLength: {
          value: 5,
          message: "密碼不得小於10個字元",
        },
        disabled: false,
      });
    } else {
      setValue("password", state.password);
      setPassRule({
        disabled: true,
      });
    }

    if (getValues("isCheckAcesskey") === "true") {
      setAccessKeyRule({
        required: "輸入使用者密碼",
        minLength: {
          value: 0,
          message: "accesskey不得小於1個字元",
        },
        disabled: false,
      });
    } else {
      setValue("accesskey", state.accessKey);
      setAccessKeyRule({
        disabled: true,
      });
    }
  }, [getValues("isCheckPass"), getValues("isCheckAcesskey")]);

  const closeModal = () => {
    // setRule({
    //   disabled: true,
    // });
    // setValue("username", state.username);
    // setValue("password", state.password);
    // setValue("role", state.role);
    // setValue("sexual", state.sexual);
    // setValue("brief", state.brief);
    // setValue("isCheckPass", false);
    closeProfileModal();
  };

  return (
    <>
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
            rules={passRule}
          />
        </div>

        <div className="mb-3">
          <CheckBoxRadioItem
            type="checkbox"
            name="isCheckPass"
            id="isCheckPass"
            value={true}
            register={register}
            errors={errors}
            rules={{ required: false }}
            labelText="更改密碼"
          />
        </div>

        <div className="mb-3">
          <InputItem
            id="accessKey"
            type="text"
            errors={errors}
            labelText="UnSplash AccessKey"
            register={register}
            rules={accessKeyRule}
          />
        </div>

        <div className="mb-3">
          <CheckBoxRadioItem
            type="checkbox"
            name="isCheckAcesskey"
            id="isCheckAcesskey"
            value={true}
            register={register}
            errors={errors}
            rules={{ required: false }}
            labelText="更改UnSplash accessKey"
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

        <div className="mb-3">
          <div className="form-label">性別</div>
          <CheckBoxRadioItem
            type="radio"
            name="sexual"
            id="men"
            value="men"
            register={register}
            errors={errors}
            rules={{ required: "請選擇您的性別" }}
            labelText="男"
          />
          <CheckBoxRadioItem
            type="radio"
            name="sexual"
            id="female"
            value="female"
            register={register}
            errors={errors}
            rules={{ required: "請選擇您的性別" }}
            labelText="女"
          />
          <CheckBoxRadioItem
            type="radio"
            name="sexual"
            id="other"
            value="other"
            register={register}
            errors={errors}
            rules={{ required: "請選擇您的性別" }}
            labelText="其他"
          />
        </div>

        <div className="mb-3">
          <TextArea
            id="brief"
            labelText="自我介紹"
            register={register}
            errors={errors}
            rules={{
              maxLength: {
                value: 100,
                message: "自我介紹不超過 100 字",
              },
            }}
            row="5"
          />
        </div>

        <div className="row row-cols-2 g-0 ">
          <div className="col-6">
            <button type="submit" className="btn btn-info">
              更新
            </button>
          </div>

          <div className="col-6">
            <button
              type="button"
              className="btn btn-info"
              // onClick={closeProfileModal}
              onClick={closeModal}
            >
              關閉
            </button>
          </div>
        </div>
      </form>
    </>
  );
});

export default ProfileEdit;
