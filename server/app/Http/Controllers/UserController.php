<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query();
        
        if($request->name != ""){
            $users->where('first_name', 'LIKE','%'.$request->name.'%')
            ->orWhere('last_name', 'LIKE','%'.$request->name.'%');
        }
        
        if($request->role_id != ""){
            $users->whereHas('roles', function($q) use($request){
                $q->where('role_id', $request->role_id);
                return $q;
            });
        }


        if($request->is_active != ""){
            $users->where('is_active', $request->is_active);
        }

        if($request->budget_id != ""){
            $users->where('budget_id', $request->budget_id);
        }
        
        $users->with(
            'roles',
            'directManager',
            'budget',
            'areas',
        );

        $data = [
            'data' => $users->paginate(10),
        ];

        return response($data, 200);
    }

    public function show($id)
    {
        //
    }


    public function store(Request $request)
    {
        $fields = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|string|unique:users,email|max:50',
            'password' => 'required|string|min:8', // removed 'confirmed'
            // 'photo' => '',
            'budget_id' => 'required',
            'roles' => '',
            'areas' => ''
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            // 'photo' => $fields['photo'],
            'password' => Hash::make($fields['password']),
            'budget_id' => $fields['budget_id'],
            'is_active' => $fields['is_active'],
        ]);

        $rolesIds = collect($fields['roles'])->pluck('id');
        $user->roles()->sync($rolesIds);

        $areasIds = collect($fields['areas'])->pluck('id');
        $user->areas()->sync($areasIds);

        $data = [
            'user' => $user,
        ];

        return response($data, 201);
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if($user){  
            $fields = $request->validate([
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                
                // if the email doesn't ahcanged, an error will occur because it is already in the database
                // and the unique rule will reject the same email because it aleady there
                // it thnks that we are duplicating
                // so you have to execulde the current user email from the unique rule
                // do not forget the comma after "email, "
                'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
                // sometimes is like unrequired
                'password' => 'sometimes|string|min:8',
                // 'photo' => '',
                'budget_id' => 'required',
                'budget_id' => 'required',
                'roles' => '',
                'areas' => ''
            ]);

            $user->update([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'email' => $fields['email'],
                // 'photo' => $fields['photo'],
                
                // 'password' => Hash::make($fields['password']),
                'budget_id' => $fields['budget_id'],
                'is_active' => $fields['is_active'],
            ]);

            $rolesIds = collect($fields['roles'])->pluck('id');
            $user->roles()->sync($rolesIds);
    
            $areasIds = collect($fields['areas'])->pluck('id');
            $user->areas()->sync($areasIds);
    
            $data = [
                'user' => $user,
            ];

            return response($data, 200);
        }
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // if it exists
        if($user){
            // detach first
            $user->roles()->detach();
            $user->areas()->detach();
            // delete tokens
            $user->tokens()->delete();
            // finally delete
            $user->delete();
        }

        return response(null, 200);
    }
}
