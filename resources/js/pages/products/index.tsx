import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
];

interface Props {
    products: {
        id: string;
        name: string;
        price: number;
        stock: number;
        created_at: string;
        updated_at: string;
    }[],
}

export default function ProductIndex({ products, }: Props) {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Products" />

            <div className="p-6">

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Products
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your product inventory here.
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                    >
                        <Plus size={18} />
                        <span>Create Product</span>
                    </Link>
                </div>

                <hr className="mt-6 mb-6" />

                {flash?.success && (
                    <div className="mt-6 rounded-lg border border-green-200 bg-green-100 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="mt-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-bold">#</th>
                                <th className="px-4 py-3 text-bold">
                                    Product Name
                                </th>
                                <th className="px-4 py-3 text-bold">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-bold">
                                    Stock
                                </th>
                                <th className="px-4 py-3 text-bold">
                                    Created At
                                </th>
                                <th className="px-4 py-3 text-bold">
                                    Updated At
                                </th>
                                <th className="px-4 py-3 text-bold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td className="px-4 py-3 text-sm">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3 font-medium">
                                            {product.name}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            Rp{' '}
                                            {Number(product.price).toLocaleString(
                                                'id-ID'
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {product.stock}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {new Date(product.created_at).toLocaleString('id-ID')}
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {new Date(product.updated_at).toLocaleString('id-ID')}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                    className="rounded-lg border border-blue-200 bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-200 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="cursor-pointer rounded-lg border border-red-200 bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-200 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-sm text-muted-foreground"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </AppLayout>
    );
}