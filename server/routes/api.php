<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->prefix('/auth')->group(function () {
    Route::post('/login', 'login');
});
Route::controller(UserController::class)->prefix('/user')->group(function () {
    Route::get('/getUser', 'getUser');
    // getGroups (teacher)
    Route::get('/getGroups', 'getGroups');
    // getGroup (student)
    Route::get('/getGroup', 'getGroup');
    // getSubjects (teacher)
    Route::get('/getSubjects/{group_id?}', 'getSubjects');
    Route::get('/getStudentSubjects/{student_id}', 'getStudentSubjects');
    // getSubjects (student)
    Route::get('/getSubjects/', 'getSubjects');
    Route::get('/getSubject/{subject_id}', 'getSubject');
    Route::get('/getTopics/{subject_id}', 'getTopics');
    Route::post('/addTopic', 'addTopic');
    Route::get('/getNews', 'getNews');
});

Route::controller(TeacherController::class)->prefix('/teacher')->group(function () {
    Route::get('/getStudents/{group_id}', 'getStudents');
});
Route::controller(ProjectController::class)->prefix('/project')->group(function () {
    Route::get('/getAll', 'getAll');
    Route::get('/getOne/{id_project}', 'getOne');
    Route::post('/addProject', 'addProject');
    Route::put('/updateProject/{id_project}', 'updateProject');
    Route::delete('/deleteProject/{id_project}', 'deleteProject');
});
Route::controller(TopicController::class)->prefix('/topic')->group(function () {
    // teacher
    Route::get('/getMaterials/{topic_id}', 'getMaterials');
    Route::get('/getTopic/{topic_id}', 'getTopic');
    Route::get('/getLecture/{lecture_id}', 'getLecture');
    Route::get('/getTest/{test_id}', 'getTest');
    Route::post('/addLecture', 'addLecture');
    Route::post('/addTest', 'addTest');
    Route::put('/updateLecture/{lecture_id}', 'updateLecture');
    Route::delete('/deleteTest/{test_id}', 'deleteTest');
    Route::delete('/deleteLecture/{lecture_id}', 'deleteLecture');
    Route::get('/getMark/{test_id}', 'getMark');
    Route::get('/getMarks/{test_id}', 'getMarks');
    Route::get('/getAnswers/{test_id}/{user_id}', 'getAnswers');
    Route::put('/updateMark/{mark_id}', 'updateMark');
    // student
});

Route::controller(AdminController::class)->prefix('/admin')->group(function () {
    Route::get('/getUsers', 'getUsers');
    Route::get('/getUser/{id_user}', 'getUser');
    Route::get('/getGroups', 'getGroups');
    Route::get('/getGroup/{id_group}', 'getGroup');
    Route::get('/getSubjects', 'getSubjects');
    Route::get('/getSubject/{id_subject}', 'getSubject');
    Route::put('/updateUser', 'updateUser');
    Route::put('/updateGroup', 'updateGroup');
    Route::put('/updateSubject', 'updateSubject');
    Route::post('/addUser', 'addUser');
    Route::post('/addGroup', 'addGroup');
    Route::post('/addSubject', 'addSubject');
    Route::delete('/deleteUser/{id_user}', 'deleteUser');
    Route::delete('/deleteGroup/{id_group}', 'deleteGroup');
    Route::delete('/deleteSubject/{id_subject}', 'deleteSubject');

    Route::get('/getNews', 'getNews');
    Route::get('/getNews/{id_news}', 'getNewsId');
    Route::post('/addNews', 'addNews');
    Route::put('/updateNews', 'updateNews');
    Route::delete('/deleteNews/{news_id}', 'deleteNews');
});
