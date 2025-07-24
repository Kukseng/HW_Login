

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarCreateType } from "@/lib/cars/CarResponse";
import { useCreateCarMutation } from "@/redux/services/car/car";


// Schema
const carFormSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().gte(1886).lte(new Date().getFullYear()),
  price: z.coerce.number().positive(),
  mileage: z.coerce.number().nonnegative(),
  description: z.string().optional(),
  color: z.string().min(1),
  fuel_type: z.string().min(1),
  transmission: z.string().min(1),
  image: z.string().url({ message: "Must be a valid image URL" }),
});

export default function CreateCarFormComponent() {

    // calling createCarMutation
    const [createCar, {data, isLoading, error}] = useCreateCarMutation();


  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema) as never,
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      description: "",
      color: "",
      fuel_type: "",
      transmission: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof carFormSchema>) {

    //create request 
    const createNewCar:CarCreateType = {
        make: values.make,
        model: values.model,
        year: values.year,
        price: values.price,
        mileage: values.mileage,
        description: values.description || '',
        color: values.color,
        fuel_type: values.fuel_type,
        transmission: values.transmission,
        image: values.image
    }

    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb21vQGdtYWlsLmNvbSIsImV4cCI6MTc1MzA4OTgyNSwidHlwZSI6ImFjY2VzcyJ9.8xbBDK2B-f8D0ocEfbvYq2qYpiCGOp10Q9pblK9uX0Y";

    createCar({
        newCar: createNewCar
    })
    console.log("The data:",data);
    console.log(error);

  }

  return (
    <div className="w-[500px] border p-8 rounded-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {[
            "make",
            "model",
            "year",
            "price",
            "mileage",
            "color",
            "fuel_type",
            "transmission",
            "image",
          ].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof z.infer<typeof carFormSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{fieldName}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={
                        ["year", "price", "mileage"].includes(fieldName)
                          ? "number"
                          : "text"
                      }
                      placeholder={fieldName}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea {...field} placeholder="Describe the car..." />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
          {
            isLoading? "Creating...": "Create The Car"
          }
          </Button>
        </form>
      </Form>
    </div>
  );
}
