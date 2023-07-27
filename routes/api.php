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

Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout')->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/produtos', 'App\Http\Controllers\ProdutoController@index');
Route::post('/produtos', 'App\Http\Controllers\ProdutoController@store');
Route::put('/produtos/{id}', 'App\Http\Controllers\ProdutoController@update');
Route::delete('/produtos/{id}', 'App\Http\Controllers\ProdutoController@destroy');
