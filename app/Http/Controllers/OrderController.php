<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{

    public function orders ()
    {
        return Order::get();
    }

    public function products ($orderId)
    {
        $order = Order::find($orderId);
        return $order->products;
    }

    public function finish ()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();

        $orderProducts = $order->products;

        $sum = $orderProducts->map(function($orderProduct) use ($order) {
            $order->products()->updateExistingPivot($orderProduct->id, [
                'price' => $orderProduct->price
            ]);
            return $orderProduct->pivot->quantity * $orderProduct->price;
        })->sum();

        $data = [
            'orderProducts' => $orderProducts,
            'sum' => $sum
        ];
        try {
            $res = Mail::send('mail.orderFinish', $data, function($message) use ($user) {
                $message->subject('Новый заказ');
                $message->to($user->email);
            });
        } catch (Exception $e) {
            
        }

        $order->status = 1;
        $order->save();
    }

    public function cart ()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();
        return $order ? $order->products : collect();
    }

    public function addProduct (Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();
        if (!$order) {
            $order = Order::create([
                'user_id' => $user->id
            ]);
        }

        $product = Product::find($request['productId']);

        if ($order->products->contains($product)) {
            $orderProduct = $order->products()->where('product_id', $product->id)->first();
            $quantity = ++$orderProduct->pivot->quantity;
            $order->products()->updateExistingPivot($product->id, [
                'quantity' => $quantity
            ]);
        } else {
            $order->products()->attach($product, [
                'quantity' => 1,
                'price' => $product->price
            ]);
            $orderProduct = $order->products()->where('product_id', $product->id)->first();
        }

        return $order->products()->get();
    }

    public function removeProduct (Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status', 0)->first();
        if (!$order) {
            $order = Order::create([
                'user_id' => $user->id
            ]);
        }

        $product = Product::find($request['productId']);

        $orderProduct = $order->products()->where('product_id', $product->id)->first();
        if ($orderProduct->pivot->quantity == 1) {
            $order->products()->detach($product);
        } else {
            $quantity = --$orderProduct->pivot->quantity;
            $order->products()->updateExistingPivot($product->id, [
                'quantity' => $quantity
            ]);
        }

        return $order->products()->get();
    }
}
