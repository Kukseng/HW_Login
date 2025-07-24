import { CarCreateType, CarResponseType, CarUpdateType } from '@/lib/cars/CarResponse'
import { baseApi } from '@/redux/baseApi'

export const carApi = baseApi.injectEndpoints({

    endpoints: (builder) =>({
        // get cars by using get method
        getCars: builder.query<CarResponseType[],{page:number, limit:number}>({
        query: ({page,limit})=> `cars?skip=${page}&limit=${limit}`,
        providesTags:['Cars']
        }),
        // get car by id 
        getCarById: builder.query<CarResponseType,string>({
            query: (id) => `cars/${id}`,
            providesTags:['Cars']

        }),
        // create car
        createCar: builder.mutation<CarResponseType, {newCar:CarCreateType}>({
            query: ({newCar}) =>({
                url: 'cars',
                method: "POST",
                body: newCar
            }),
            invalidatesTags: ['Cars']
    
        }),
        // update car 
        udpateCar: builder.mutation<CarResponseType, {updateCar:CarUpdateType, id:string}>({
            query: ({updateCar, id}) =>({
                url: `cars/${id}`,
                method: "PUT",
                body: updateCar
            }),
            invalidatesTags:['Cars']
        }),
        // delete car
         deleteCar: builder.mutation<CarResponseType, {id:string}>({
            query: ({id}) =>({
                url: `cars/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:['Cars']
        })
    }),
    overrideExisting: true
})

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useCreateCarMutation,
    useUdpateCarMutation,
    useDeleteCarMutation
}=carApi

export type { CarResponseType }

