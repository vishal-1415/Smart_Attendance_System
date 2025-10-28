import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  students: [],
  loading: false,
  error: null,
  alertBox:{
    show:false,
    title:"",
    message:"",
    color:""
  }
};

// Async thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    return await api.getAllStudents();
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData) => {
    return await api.addStudent(studentData);
  }
);

export const markAttendance = createAsyncThunk(
  'students/markAttendance',
  async ({ studentId, present }) => {
    return await api.markAttendance(studentId, present);
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setAlertBox:(state,action)=> {
      state.alertBox = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      });
  },
});

export const { setStudents, setAlertBox } =
  studentSlice.actions;
export default studentSlice.reducer;
