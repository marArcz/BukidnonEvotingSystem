<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/polls')->group(function(){
    Route::post('/upload-image',[PollController::class,'uploadImage'])->name('upload-poll-image');
    Route::post('/add',[PollController::class,'store'])->name('add-poll');
    Route::post('/edit',[PollController::class,'save'])->name('edit-poll');
    Route::post('/options/add',[PollController::class,'addOptions'])->name('add-poll-options');
    Route::post('/options/edit',[PollController::class,'savePollOptions'])->name('add-poll-options');
    Route::post('/join', [PollController::class, 'apiJoinPoll'])->name('api.join.poll');
    Route::post('/resume', [PollController::class, 'resume_poll'])->name('api.resume.poll');

})->middleware(['auth']);

Route::prefix('/votes')->group(function(){
    Route::post('/add',[VoteController::class,'store'])->name('add-vote');
})->middleware(['auth']);

Route::prefix('/profile')->group(function(){
    Route::post('/photo/change',[ProfileController::class,'changePhoto'])->name('profile.change.photo');
    Route::post('/password/change',[ProfileController::class,'changePassword'])->name('profile.change.password');
})->middleware(['auth']);
