<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Crypt;
// use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()
            ->select([
                'id',
                'name',
                'price',
                'stock',
                'created_at',
                'updated_at',
            ])
            ->get()
            ->map(function ($product) {
                return [
                    'id' => Crypt::encryptString($product->id),
                    'name' => $product->name,
                    'price' => $product->price,
                    'stock' => $product->stock,
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at,
                ];
            });

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product)
    {
        return Inertia::render('products/create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        Product::create($request->validated());

        return redirect()
            ->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Product $product, Product $product)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product_id = Crypt::decryptString($id);

        $product = Product::findOrFail($product_id);

        return Inertia::render('products/edit', [
            'product' => [
                'id' => $id,
                'name' => $product->name,
                'price' => $product->price,
                'stock' => $product->stock,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, string $id)
    {
        $product_id = Crypt::decryptString($id);

        $product = Product::findOrFail($product_id);

        $product->update($request->validated());

        return redirect()
            ->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Product $product, Product $product)
    // {
    //     //
    // }
}
