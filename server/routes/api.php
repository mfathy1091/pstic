<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Unprotected Routes
Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');

// Protected Routes
Route::group(['middleware' => ['auth:sanctum'], 'namespace' => 'App\Http\Controllers'], function () {
    Route::post('/auth/logout', 'AuthController@logout');
    Route::get('/auth/user', 'AuthController@getAuthenticatedUser');


    // Users
    Route::get('/users', 'UserController@index');
    Route::get('/users/{id}', 'UserController@show');
    Route::post('/users', 'UserController@store');
    Route::put('/users/{id}', 'UserController@update');
    Route::delete('/users/{id}', 'UserController@destroy');
});
