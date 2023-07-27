<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;

class ProdutoController extends Controller
{
    public function index()
{
    $produtos = Produto::all();
    return response()->json($produtos);
}

public function store(Request $request)
{
    $produto = new Produto();
    $produto->nome = $request->nome;
    $produto->descricao = $request->descricao;
    $produto->preco = $request->preco;
    $produto->categoria = $request->categoria;
    $produto->save();
    return response()->json($produto, 201);
}

public function update(Request $request, $id)
{
    $produto = Produto::findOrFail($id);
    $produto->nome = $request->nome;
    $produto->descricao = $request->descricao;
    $produto->preco = $request->preco;
    $produto->categoria = $request->categoria;
    $produto->save();
    return response()->json($produto, 200);
}

public function destroy($id)
{
    $produto = Produto::findOrFail($id);
    $produto->delete();
    return response()->json(null, 204);
}
}
