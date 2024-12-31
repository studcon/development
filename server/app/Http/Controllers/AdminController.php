<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\News;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use File;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    function getUsers()
    {
        return ['code' => 200, 'message' => User::whereNot('role_id', 3)->get()->except(['password'])];
    }

    function getUser($id_user)
    {
        return ['code' => 200, 'message' => User::find($id_user)->get(['*'])->except(['password'])];
    }

    function getGroups()
    {
        return ['code' => 200, 'message' => Group::all()];
    }

    function getGroup($id_group)
    {
        return ['code' => 200, 'message' => Group::find($id_group)];
    }

    function getSubjects()
    {
        return ['code' => 200, 'message' => Subject::all()];
    }

    function getSubject($id_subject)
    {
        return ['code' => 200, 'message' => Subject::find($id_subject)];
    }

    function updateUser(Request $request, $id_user)
    {
        if ($request->has('password')) {
            $request->merge(['password' => Hash::make($request->password)]);
        }
        $user = User::find($id_user);
        // upload a photo
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('/avatars'), $filename);
            $user->photo = $filename;
            $user->save();
        }

        $user->update($request->except('photo'));
        // dd($request->all());
        // dd($user);
        return ['code' => 200, 'message' => 'Успешно изменено'];
    }

    function updateGroup(Request $request)
    {
        return ['code' => 200, 'message' => Group::find($request->id)->update($request->all())];
    }

    function updateSubject(Request $request)
    {
        return ['code' => 200, 'message' => Subject::find($request->id)->update($request->all())];
    }

    function addUser(Request $request)
    {

        $user =  User::create($request->all());
        $user->password = Hash::make($request->password);
        // upload a photo
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('/avatars'), $filename);
            $user->photo = $filename;
            $user->save();
        }
        return ['code' => 201, 'message' => $user];
    }

    function addGroup(Request $request)
    {
        return ['code' => 201, 'message' => Group::create($request->all())];
    }

    function addSubject(Request $request)
    {
        return ['code' => 201, 'message' => Subject::create($request->all())];
    }

    function deleteUser($id_user)
    {
        return ['code' => 410, 'message' => User::find($id_user)->delete()];
    }

    function deleteGroup($id_group)
    {
        return ['code' => 200, 'message' => Group::find($id_group)->delete()];
    }

    function deleteSubject($id_subject)
    {
        return ['code' => 410, 'message' => Subject::find($id_subject)->delete()];
    }

    function getNews()
    {
        return ['code' => 200, 'message' => News::all()];
    }

    function getNewsId($id_news)
    {
        return ['code' => 200, 'message' => News::find($id_news)];
    }

    function addNews(Request $request)
    {
        return ['code' => 201, 'message' => News::create($request->all())];
    }

    function updateNews(Request $request)
    {
        return ['code' => 200, 'message' => News::find($request->id)->update($request->all())];
    }

    function deleteNews($id_news)
    {
        return ['code' => 410, 'message' => News::find($id_news)->delete()];
    }
}
