import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    events: []
}
const eventSlice = createSlice({
    initialState,
    name: 'event slice',
    reducers : {
        addEvent: (state, action) => {
            if (!Array.isArray(state.events)) {
                state.events = [];
            }
        
            const existing_data = JSON.parse(localStorage.getItem('events') || "[]");
            const new_data = { ...action.payload };
        
            state.events.push(new_data);
        
            const updated_data = [...existing_data, new_data];
            localStorage.setItem('events', JSON.stringify(updated_data));
        },
        deleteEvent: (state, action) => {
            if (!Array.isArray(state.events)) {
                state.events = [];
            }
        
            const filteredEvents = state.events.filter((event) => event._id !== action.payload.id);
        
            if (filteredEvents.length !== state.events.length) {
                state.events = filteredEvents;
                localStorage.setItem('events', JSON.stringify(state.events));
            }
        },
        
        updateEvent: (state, action) => {
            if (!Array.isArray(state.events) || !state.events) {
                state.events = [];
            }
        
            state.events = state.events.map((event) =>
                event._id === action.payload._id ? { ...event, ...action.payload } : event
            );
        },
        
    }
});

export const {addEvent, deleteEvent,updateEvent} = eventSlice.actions;
export default eventSlice.reducer;