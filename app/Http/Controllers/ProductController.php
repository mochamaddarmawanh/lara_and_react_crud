<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
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
            $product->encrypted_id = Crypt::encryptString($product->id);

            return $product;
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
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Product $product, Product $product)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Product $product, Product $product)
    // {
    //     //
    // }
}
