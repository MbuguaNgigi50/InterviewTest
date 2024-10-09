"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { getProducts } from "@/lib/products";

import { Products } from "@prisma/client"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface ProductProps {
	items: Products[];
}

export default function DropdownView({
    items = [],
}: ProductProps) {

    const productItems = items.map((item) => ({
		label: item.productName,
		value: item.productId,
	}));

    const products = getProducts()


    return (
			<>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>Products</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56'>
						<DropdownMenuLabel>Products</DropdownMenuLabel>
						<DropdownMenuSeparator />
						
                    {productItems.map(
                            items
                    ) => <DropdownMenuItem
                    key={productItems.value}
                    >
                        {productItems.label}
                    </DropdownMenuItem>
                        }
					</DropdownMenuContent>
				</DropdownMenu>
			</>
		);
}