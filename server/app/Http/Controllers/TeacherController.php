<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    function getStudents($group_id)
    {
        return ['code' => 200, 'message' => User::where('group_id', $group_id)->get()];
    }
}
