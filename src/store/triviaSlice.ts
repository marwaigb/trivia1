import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuestion } from "../models/IQuestion";
import { AnswerObject } from "../models/AnswerObject";


export const fetchTodoCollectionAsync = createAsyncThunk(
	'todo/fetchCollection',
	async () => {
		const response = await fetch('/questions.json');
		return await response.json();
	}
);


export const triviaSlice = createSlice({
    name: 'trivia',
    initialState: {
        items: new Array<IQuestion>(),
       
        userAnwers: new Array<AnswerObject>(5),
        index: 0
    },
    reducers: {
        resetUserAnswer: (state ,action: PayloadAction<AnswerObject>) => {
            for(let i=0; i< state.userAnwers.length; i++){
                console.log('hi');
                console.log(action.payload);
                state.userAnwers[i] = action.payload;
            }
        },

        addUserAnswer: (state, action: PayloadAction<AnswerObject>) => {
            state.userAnwers[state.index] = action.payload;
        },
        changeIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTodoCollectionAsync.fulfilled,
                (state, action: PayloadAction<IQuestion[]>) => {
                    state.items = action.payload;
                }
            );
    },
});
export  const {addUserAnswer, changeIndex, resetUserAnswer} = triviaSlice.actions;
export default triviaSlice.reducer;