import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {
      // console.log(action);

      if (action.payload.success) {
        state.push({
          id: action.payload.id,
          type: action.payload.type,
          title: action.payload.title,
          text: action.payload.message,
        });
      } else {
        state.push({
          id: action.payload.id,
          type: action.payload.type,
          title: action.payload.title,
          text: Array.isArray(action.payload?.message)
            ? action.payload?.message.join("、")
            : action.payload?.message,
        });
      }

      //下面為用同步的方式撰寫，但要用setTime會出錯
      // console.log("createMessage", action.payload);
      //   const id = new Date().getTime();
      //   state.push({
      //     id: id,
      //     type: "success",
      //     title: "成功",
      //     text: action.payload.message,
      //   });
      //   setTimeout(() => {
      //     //state 沒有辦法在非同步的狀態下存取
      //     const index = state.findIndex((item) => item === id);
      //     state.splice(index, 1);
      //   }, 2000);
    },
    removeMessage(state, action) {
      // console.log("removeMessage", action.payload);
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});
// 這裡建立的方法，可以被其他元件使用
// 自定義名稱, async function
export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage",

  //payload, params 有這兩個參數
  async function (payload, { dispatch, requestId }) {
    //console.log("createAsyncMessage", payload, params);
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, payload.time);
  }
);

export const { createMessage } = messageSlice.actions;
export default messageSlice.reducer;
