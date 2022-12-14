import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore,
} from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { filter } from './filterSlice'
import { like } from './likedSlice'
import { packsApi } from './packsApi'

const rootReducer = combineReducers({
	[packsApi.reducerPath]: packsApi.reducer,
	filter,
	like,
	toastr: toastrReducer,
})
const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(packsApi.middleware),
	devTools: true,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
