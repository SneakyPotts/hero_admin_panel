import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/filters");
  }
);

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
      .addCase(fetchFilters.fulfilled, (state, action) => {
        filtersAdapter.setAll(state, action.payload);
        state.filtersLoadingStatus = 'idle';
      })
      .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
      .addDefaultCase(() => {});
  }
});

const {actions, reducer} = filterSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filterReducer);

export default reducer;
export const {
  activeFilterChanged
} = actions;