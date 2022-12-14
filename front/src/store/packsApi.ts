import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FilterState } from './filterSlice'

export const packsApi = createApi({
	reducerPath: 'packsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://127.0.0.1:8000/api/',
	}),
	endpoints: (build) => ({
		getAllPacks: build.query({
			query: (filter?: FilterState) => {
				const params: any = {}
				if (filter?.search) params.search = filter.search
				if (filter?.downloads) params.downloads = filter.downloads
				if (filter?.likes) params.likes = filter.likes
				if (filter?.weight) params.weight = filter.weight
				return {
					method: 'GET',
					url: 'packs',
					contentType: 'application/json',
					params,
				}
			},
		}),
		createNewPack: build.mutation({
			query: (pack: any) => {
				return {
					method: 'post',
					url: 'packs',
					contentType: 'application/json',
					body: pack,
				}
			},
		}),
		updatePack: build.mutation({
			query: ({ id, ...rest }: any) => {
				return {
					method: 'put',
					url: `packs/${id}`,
					contentType: 'application/json',
					body: rest,
				}
			},
		}),
		deletePack: build.mutation({
			query: ({ id }: any) => {
				return {
					method: 'delete',
					url: `packs/delete/${id}`,
					contentType: 'application/json',
				}
			},
		}),
		likePack: build.mutation({
			query: ({ id }: any) => {
				return {
					method: 'put',
					url: `packs/like/${id}`,
					contentType: 'application/json',
				}
			},
		}),
		downloadPack: build.mutation({
			query: ({ id }: any) => {
				return {
					method: 'put',
					url: `packs/download/${id}`,
					contentType: 'application/json',
				}
			},
		}),
		updatePacksName: build.mutation({
			query: ({ id, name }: any) => {
				return {
					method: 'put',
					url: `packs`,
					contentType: 'application/json',
					body: {
						id: id,
						name: name,
					},
				}
			},
		}),
		getMainPage: build.query({
			query: () => {
				return {
					method: 'GET',
					url: 'main_page',
					contentType: 'application/json',
				}
			},
		}),
	}),
})

export const {
	useGetAllPacksQuery,
	useGetMainPageQuery,
	useCreateNewPackMutation,
	useUpdatePackMutation,
	useDeletePackMutation,
	useDownloadPackMutation,
	useLikePackMutation,
	useUpdatePacksNameMutation,
} = packsApi
