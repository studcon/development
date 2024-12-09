<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Group_Subject;
use App\Models\News;
use App\Models\Subject;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Matcher\Subset;

class UserController extends Controller
{
    function getUser(Request $request)
    {
        return ['code' => '200', 'message' =>
        User::find($request->header('user_id'))->only(['name', 'surname', 'patronymic'])];
    }


    function getGroups(Request $request)
    {
        $subjects = Subject::where('user_id', $request->header('user_id'))->groupBy('group_id')->get(['group_id']);
        $groups = [];
        foreach ($subjects as $subject) {
            array_push($groups, Group::where('id', $subject->group_id)->get());
        }
        return ['code' => '200', 'message' => $groups];
    }

    function getSubject($subject_id)
    {

        return ['code' => '200', 'message' => Subject::find($subject_id)];
    }
    function getSubjects(Request $request, $group_id = null)
    {
        if (!is_null($group_id))
            return ['code' => '200', 'message' => Subject::where('group_id', $group_id)->get()];

        return ['code' => '200', 'message' => Subject::where('user_id', $request->header('user_id'))->get()];
    }


    function getTopics($subject_id)
    {
        return ['code' => '200', 'message' => Topic::where('subject_id', '=', $subject_id)->get()];
    }

    function addTopic(Request $request)
    {
        return ['code' => '200', 'message' => Topic::create($request->all())];
    }

    function getNews()
    {
        return ['code' => 200, 'message' => News::all()];
    }
}
