<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    function getAll(Request $request)
    {
        return User::find($request->header('user_id'))->projects;
    }

    function addProject(Request $request)
    {
        // dd($request->all());
        $request->merge(['user_id' => $request->header('user_id')]);
        $project = Project::create($request->except('image'));
        // upload a photo
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('/projects'), $filename);
            $project->image = $filename;
            $project->save();
        }
        return ['code' => 201, 'message' => 'Успешно создано'];
    }

    function getOne($project_id)
    {
        return Project::find($project_id);
    }

    function updateProject(Request $request, $project_id)
    {
        Project::find($project_id)->update($request->all());
        return ['code' => 201, 'message' => 'Успешно изменено'];
    }

    function deleteProject($project_id)
    {
        Project::find($project_id)->delete();
        return ['code' => 410, 'message' => 'Удаленно'];
    }
}
