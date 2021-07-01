<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show ()
    {
        $user = Auth::user();
        $orders = $user->orders;
        return view('profile', ['orders' => $orders]);
    }
}
