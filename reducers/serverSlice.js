import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    selectedServer: null,
    sendMessageIsOpen: true,
  },
  reducers: {
    selectServer: (state, action) => {
      state.selectedServer = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
  },
});

export const {
  selectServer,
  openSendMessage,
  closeSendMessage,
} = serverSlice.actions;

export const selectOpenServer = (state) => state.server.selectedServer;
export const selectSendMessageIsOpen = (state) => state.server.sendMessageIsOpen;

export default serverSlice.reducer;
