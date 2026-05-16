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
        title: 'Create',
        href: '/products/create',
    },
];

export default function ProductCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/products');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <div className="p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create Product
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Add a new product to your inventory.
                        </p>
                    </div>
                </div>

                <hr className="mt-6 mb-6" />

                {/* Form Card */}
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
                            className="w-full rounded-lg border border-input focus:border-gray-500 bg-background px-4 py-2 outline-none transition"
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
                                setData('price', e.target.value)
                            }
                            className="w-full rounded-lg border border-input focus:border-gray-500 bg-background px-4 py-2 outline-none transition"
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
                                setData('stock', e.target.value)
                            }
                            className="w-full rounded-lg border border-input focus:border-gray-500 bg-background px-4 py-2 outline-none transition"
                            placeholder="Enter stock"
                        />

                        {errors.stock && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.stock}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="min-h-[120px] w-full rounded-lg border border-input focus:border-gray-500 bg-background px-4 py-2 outline-none transition"
                            placeholder="Enter description"
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                            href="/products"
                            className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted"
                        >
                            Back
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black cursor-pointer"
                        >
                            {processing ? 'Saving...' : 'Create Product'}
                        </button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}