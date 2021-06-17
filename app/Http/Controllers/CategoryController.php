<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{

    public function welcome ()
    {
        $categories = Category::get();
        return view('welcome', [
            'categories' => $categories,
            ]);
    }

    public function show ($categoryId)
    {        
        $products = DB::table('products')
            ->where('category_id', '=', $categoryId)
            ->get();

        return view('categoryProducts', [
            'products' => $products
            ]);
    }

    public function list ()
    {
        $categories = Category::get();
        return view('categories', [
            'categories' => $categories,
            'title' => 'Категории'
            ]);
    }

    public function create(Request $request)
    {
        sleep(1);
        Category::create([
            'title' => $request['name'],
            'description' => $request['desc']
        ]);
    }

    public function get()
    {
        return Category::get();
    }
}
