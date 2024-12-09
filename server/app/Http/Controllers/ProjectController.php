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
        Project::create($request->all());
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
