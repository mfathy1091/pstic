<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',    // removed 'confirmed'
        ]);   

        // Check if user exists
        $user = User::where('email', $fields['email'])->first();

        // Check if the password is correct
        if(!$user || !Hash::check($fields['password'], $user->password)){
            $response = [
                'message' => 'Not matched cretentials',
            ];
            
            return response($response, 401);
        }

        // create token
        $token = $user->createToken('auth_token')->plainTextToken;

        $data = [
            'token' => $token,
            'token_type' => 'Bearer'
        ];

        return response($data, 200);
    }


    public function logout(Request $request){
        // delete the tokens
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged Out',
        ];
    }

    public function getAuthenticatedUser(){
        return response(Auth::user(), 200);
    }
}
