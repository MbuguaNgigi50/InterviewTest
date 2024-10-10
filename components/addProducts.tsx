"use client";

import * as React from 'react'
import * as z from 'zod'

import { ProductsSchema } from "@/schemas";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { productAdd } from '@/actions/products';

export function AddProducts() {

    const [isPending, startTransition] = React.useTransition();

    const form = useForm<z.infer<typeof ProductsSchema>>({
			resolver: zodResolver(ProductsSchema),
			defaultValues: {
				productName: "",
			},
		});

		const onAdd = (values: z.infer<typeof ProductsSchema>) => {
			startTransition(() => {
				productAdd(values)
					.then((callback) => {
						if (!callback?.error) {
							toast.success("Product Added");
						}
						if (callback?.error) {
							toast.error(callback.error);
						}
					})
					.finally(() => {
						setTimeout(() => {}, 3000);
					});
			});
		};
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onAdd)} className='space-y-6'>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<FormField
								control={form.control}
								name='productName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Add Products</FormLabel>
										<FormControl>
											<Input
												id='products'
												placeholder='Products'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' disabled={isPending}>
							Add
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
