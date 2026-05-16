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

export default function ProductIndex() {
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

            </div>

        </AppLayout>
    );
}