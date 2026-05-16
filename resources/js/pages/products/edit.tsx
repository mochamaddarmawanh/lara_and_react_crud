import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Props {
    product: {
        id: string;
        name: string;
        price: number;
        stock: number;
    };
}

export default function ProductEdit({
    product,
}: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const confirmed = confirm('Are you sure you want to update this product?');

        if (!confirmed) {
            return;
        }

        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />

            <div className="p-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Product
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Update product information.
                    </p>
                </div>

                <hr className="mt-6 mb-6" />

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">

                    {/* Product Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Product Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none transition focus:border-gray-500"
                            placeholder="Enter product name"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Price <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData('price', Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none transition focus:border-gray-500"
                            placeholder="Enter price"
                        />

                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Stock <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            value={data.stock}
                            onChange={(e) =>
                                setData('stock', Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none transition focus:border-gray-500"
                            placeholder="Enter stock"
                        />

                        {errors.stock && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.stock}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={route('products.index')}
                            className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted"
                        >
                            Back
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
                        >
                            {processing ? 'Update Product' : 'Update Product'}
                        </button>
                    </div>

                </form>

            </div>

        </AppLayout>
    );
}