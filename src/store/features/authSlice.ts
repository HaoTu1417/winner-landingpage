import { MemberService } from "@/services/member.service";
import { AuthCredentials } from "@/types/member";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  isAuth: false,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.status = "succeeded";
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.status = "failed";
      })

      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
        state.status = "failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.status = "succeeded";
      })
      .addCase(logout.rejected, (state) => {
        state.isAuth = false;
        state.status = "failed";
      });
  },
});

export const { setAuth } = authSlice.actions;

// Create async thunk for the API calls
export const checkAuth = createAsyncThunk(
  "auth/fetch",
  async (_, { rejectWithValue }) => {
    const response = await MemberService.getSetting({
      lang: "VN",
      time_stamp: Math.floor(Date.now() / 1000),
    });
    if (response.status !== 200) {
      return rejectWithValue(response.error || "Request Failed!");
    }
    return response.data;
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const response = await MemberService.signOut({
      lang: "VN",
      time_stamp: Math.floor(Date.now() / 1000),
    });
    if (response.status !== 200) {
      return rejectWithValue(response.error || "Request Failed!");
    }
    return response.data;
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    const response = await MemberService.login(credentials);
    if (response.status !== 200) {
      return rejectWithValue(response.error || "Request Failed!");
    }
    return response.data;
  },
);

export default authSlice.reducer;
